import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sameOrigin, limitedBody, rateLimit, PayloadTooLargeError } from '@/lib/http';
import { privilegedClient } from '@/lib/supabase/server';
const schema = z.object({
  event: z.enum([
    'project_view',
    'live_demo_click',
    'github_click',
    'contact_click',
    'resume_click',
  ]),
  project_id: z.uuid().optional(),
});
export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'true')
    return new Response(null, { status: 204 });
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  try {
    const data = schema.safeParse(
      JSON.parse(new TextDecoder().decode(await limitedBody(request, 1000))),
    );
    if (!data.success) return new Response(null, { status: 400 });
    if (!(await rateLimit(request, 'events', 90, 60))) return new Response(null, { status: 429 });
    const client = privilegedClient();
    if (data.data.project_id) {
      const { data: p, error: projectError } = await client
        .from('projects')
        .select('id')
        .eq('id', data.data.project_id)
        .eq('published', true)
        .maybeSingle();
      if (projectError) throw new Error('Could not verify the project.');
      if (!p) return new Response(null, { status: 400 });
    }
    const { error } = await client.from('analytics_events').insert(data.data);
    if (error) throw error;
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) return new Response(null, { status: 413 });
    if (error instanceof SyntaxError) return new Response(null, { status: 400 });
    return NextResponse.json({ error: 'Unavailable' }, { status: 503 });
  }
}
