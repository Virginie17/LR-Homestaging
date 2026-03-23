-- =========================
-- EXTENSIONS
-- =========================
create extension if not exists pgcrypto;

-- =========================
-- TABLE USERS
-- =========================
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  credits integer not null default 1,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
on public.users
for update
to authenticated
using (auth.uid() = id);

-- =========================
-- AUTO-CREATION DU PROFIL À L'INSCRIPTION
-- =========================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, credits)
  values (new.id, new.email, 1)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- =========================
-- CONSOMMATION ATOMIQUE D'UN CRÉDIT
-- =========================
create or replace function public.consume_credit(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  remaining integer;
begin
  update public.users
  set credits = credits - 1,
      updated_at = now()
  where id = p_user_id
    and credits > 0
  returning credits into remaining;

  if remaining is null then
    raise exception 'NO_CREDITS';
  end if;

  return remaining;
end;
$$;

grant execute on function public.consume_credit(uuid) to authenticated;
grant execute on function public.consume_credit(uuid) to service_role;