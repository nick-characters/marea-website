declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** GA4 page_view for ClientRouter navigations (initial view is sent by the config call). */
export function trackPageView() {
  window.gtag?.("event", "page_view", { page_location: location.href, page_title: document.title });
}

export function trackLead(params: Record<string, string>) {
  window.gtag?.("event", "generate_lead", { ...params, form_name: "brochure" });
}
