"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CheckoutResume() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hasRun = useRef(false);

  useEffect(() => {
    const checkout = searchParams.get("checkout");
    const priceId = searchParams.get("priceId");

    if (checkout !== "1" || !priceId || hasRun.current) return;

    hasRun.current = true;

    const resumeCheckout = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          router.replace(pathname);
          return;
        }

        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ priceId }),
        });

        const data = await res.json();

        if (!res.ok || !data?.url) {
          throw new Error(data?.error || "Erreur checkout Stripe");
        }

        window.location.href = data.url;
      } catch (error) {
        console.error("Resume checkout error:", error);
        router.replace(pathname);
      }
    };

    resumeCheckout();
  }, [searchParams, router, pathname]);

  return null;
}
