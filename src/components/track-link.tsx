'use client';
import { useEffect, type AnchorHTMLAttributes } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';
export function TrackLink({
  event,
  projectId,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: AnalyticsEvent; projectId?: string }) {
  return <a {...props} onClick={() => track(event, projectId)} />;
}
export function ProjectView({ id }: { id: string }) {
  useEffect(() => {
    track('project_view', id);
  }, [id]);
  return null;
}
