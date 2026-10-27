import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sameOrigin, limitedBody, rateLimit, PayloadTooLargeError } from '@/lib/http';
import { privilegedClient } from '@/lib/supabase/server';
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  try {
    const parsed = contactSchema.safeParse(
      JSON.parse(new TextDecoder().decode(await limitedBody(request, 12000))),
    );
    if (!parsed.success)
      return NextResponse.json({ error: 'Invalid contact details.' }, { status: 400 });
    const { website, started, ...message } = parsed.data;
    if (website || Date.now() - started < 2000 || Date.now() - started > 86400000)
      return NextResponse.json({ error: 'Please try again.' }, { status: 400 });
    if (!(await rateLimit(request, 'contact', 5, 3600)))
      return NextResponse.json({ error: 'Please try again later.' }, { status: 429 });
    const { error } = await privilegedClient().from('contact_messages').insert(message);
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof PayloadTooLargeError)
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    if (error instanceof SyntaxError)
      return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
    return NextResponse.json({ error: 'Message unavailable. Please try again.' }, { status: 503 });
  }
}
