export type FunnelEventName =
  | 'home_about_click'
  | 'about_founder_profile_click'
  | 'founder_profile_view'
  | 'article_author_profile_click'
  | 'learn_view'
  | 'learn_series_open'
  | 'learn_lesson_start'
  | 'learn_lesson_complete'
  | 'learn_next_lesson'
  | 'learn_roadmap_view'
  | 'learn_to_service_click'
  | 'learn_to_priorities_click'
  | 'learn_consultation_click'
  | 'free_learning_view'
  | 'free_learning_video_click'
  | 'free_learning_to_roadmap_click'
  | 'roadmap_start'
  | 'roadmap_complete'
  | 'roadmap_result'
  | 'roadmap_consultation_click'
  | 'service_learning_video_click'
  | 'consultation_form_start'
  | 'consultation_form_submit'
  | 'consultation_whatsapp_click';

type FunnelDetail = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const trackFunnelEvent = (name: FunnelEventName, detail: FunnelDetail = {}) => {
  try {
    const payload = { event: name, ...detail };
    window.dispatchEvent(new CustomEvent('kultivate:funnel', { detail: payload }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
  } catch {
    // Measurement must never interrupt the user journey.
  }
};
