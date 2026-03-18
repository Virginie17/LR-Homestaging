declare global {
  interface Window {
    gtag?: (command: string, targetId?: string, config?: any) => void;
  }
}

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Tracking functions
export const trackEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, data);
  }
};

export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};
