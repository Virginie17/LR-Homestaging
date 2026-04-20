-- =========================================================
-- LR HOMESTAGING - SUPABASE SETUP
-- =========================================================

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
  credits integer not null default 1 check (credits >= 0),
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
-- TABLE CREDIT_PURCHASES
-- =========================
create table if not exists public.credit_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  stripe_session_id text not null unique,
  stripe_customer_email text,
  stripe_price_id text,
  credits_added integer not null check (credits_added > 0),
  amount_total integer,
  currency text,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

create index if not exists idx_credit_purchases_user_id
  on public.credit_purchases(user_id);

create index if not exists idx_credit_purchases_created_at
  on public.credit_purchases(created_at desc);

alter table public.credit_purchases enable row level security;

drop policy if exists "credit_purchases_select_own" on public.credit_purchases;
create policy "credit_purchases_select_own"
on public.credit_purchases
for select
to authenticated
using (auth.uid() = user_id);

-- =========================
-- TABLE GENERATION_LOGS
-- =========================
create table if not exists public.generation_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  generation_type text not null check (generation_type in ('staging', 'projection', 'free')),
  source_image_count integer not null default 1 check (source_image_count > 0),
  credits_used integer not null default 0 check (credits_used >= 0),
  success boolean not null default false,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists idx_generation_logs_user_id
  on public.generation_logs(user_id);

create index if not exists idx_generation_logs_created_at
  on public.generation_logs(created_at desc);

alter table public.generation_logs enable row level security;

drop policy if exists "generation_logs_select_own" on public.generation_logs;
create policy "generation_logs_select_own"
on public.generation_logs
for select
to authenticated
using (auth.uid() = user_id);

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
for each row
execute procedure public.handle_new_user();

-- =========================
-- MISE À JOUR AUTOMATIQUE DE updated_at
-- =========================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row
execute procedure public.set_updated_at();

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

-- =========================
-- AJOUT ATOMIQUE DE CRÉDITS
-- =========================
create or replace function public.add_credits(
  p_user_id uuid,
  p_credits integer
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_balance integer;
begin
  if p_credits is null or p_credits <= 0 then
    raise exception 'INVALID_CREDITS_AMOUNT';
  end if;

  update public.users
  set credits = credits + p_credits,
      updated_at = now()
  where id = p_user_id
  returning credits into new_balance;

  if new_balance is null then
    raise exception 'USER_NOT_FOUND';
  end if;

  return new_balance;
end;
$$;

-- =========================
-- DROITS D'EXÉCUTION
-- =========================
grant execute on function public.consume_credit(uuid) to authenticated;
grant execute on function public.consume_credit(uuid) to service_role;

grant execute on function public.add_credits(uuid, integer) to service_role;
grant execute on function public.add_credits(uuid, integer) to authenticated;