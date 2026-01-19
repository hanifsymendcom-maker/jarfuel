// Analytics utility for tracking conversion events
// Uses Umami if available, with console fallback for development

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: EventData) => void;
    };
  }
}

/**
 * Track a custom event for analytics
 * @param eventName - Name of the event (e.g., 'signup', 'cta_click', 'share')
 * @param eventData - Optional data to include with the event
 */
export function trackEvent(eventName: string, eventData?: EventData): void {
  // Get UTM parameters to include with every event
  const utmParams = getUTMParams();
  const enrichedData = { ...utmParams, ...eventData };

  // Track with Umami if available
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName, enrichedData);
  }

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, enrichedData);
  }
}

/**
 * Track scroll depth milestones
 * @param percent - Scroll depth percentage (25, 50, 75, 100)
 */
export function trackScrollDepth(percent: number): void {
  trackEvent("scroll_depth", { percent });
}

/**
 * Track time on page milestones
 * @param seconds - Time spent on page in seconds
 */
export function trackTimeOnPage(seconds: number): void {
  trackEvent("time_on_page", { seconds });
}

/**
 * Track CTA button clicks
 * @param location - Where the CTA is located (hero, pricing, final, sticky)
 * @param ctaText - Text of the CTA button
 */
export function trackCTAClick(location: string, ctaText: string): void {
  trackEvent("cta_click", { location, cta_text: ctaText });
}

/**
 * Get UTM parameters from URL
 */
function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
}

/**
 * Initialize scroll depth tracking
 */
export function initScrollTracking(): () => void {
  if (typeof window === "undefined") return () => {};

  const milestones = [25, 50, 75, 100];
  const trackedMilestones = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    milestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackScrollDepth(milestone);
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

/**
 * Initialize time-on-page tracking
 */
export function initTimeTracking(): () => void {
  if (typeof window === "undefined") return () => {};

  const milestones = [10, 30, 60, 120, 300]; // seconds
  const trackedMilestones = new Set<number>();
  let startTime = Date.now();

  const checkTime = () => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

    milestones.forEach((milestone) => {
      if (elapsedSeconds >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackTimeOnPage(milestone);
      }
    });
  };

  const interval = setInterval(checkTime, 5000);
  return () => clearInterval(interval);
}
