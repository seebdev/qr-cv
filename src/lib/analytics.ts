export type AnalyticsEvent =
  'project_view' | 'live_demo_click' | 'github_click' | 'contact_click' | 'resume_click';
export function track(event: AnalyticsEvent, projectId?: string) {
  if (
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'true' ||
    typeof window === 'undefined' ||
    navigator.doNotTrack === '1'
  )
    return;
  void fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, project_id: projectId }),
    keepalive: true,
  }).catch(() => {});
}
