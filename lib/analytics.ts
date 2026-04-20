declare global {
  interface Window {
    gtag?: (
      command: "event" | "config",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Vérifie si GA est actif
const isAnalyticsEnabled = () => {
  return typeof window !== "undefined" && !!window.gtag && !!GA_ID;
};

// 🔹 Track event (clic, action, etc.)
export const trackEvent = (
  eventName: string,
  data?: Record<string, unknown>
) => {
  if (!isAnalyticsEnabled()) return;

  window.gtag!("event", eventName, {
    ...data,
  });
};

// 🔹 Track page view
export const trackPageView = (pageName?: string) => {
  if (!isAnalyticsEnabled()) return;

  window.gtag!("config", GA_ID!, {
    page_title: pageName || document.title,
    page_location: window.location.href,
  });
};