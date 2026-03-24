declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, data);
  }
};

export const trackPageView = (pageName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-DEVMODE123", {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};