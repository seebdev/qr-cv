import { requireAdmin } from '@/lib/auth';
import { markRead } from '../../actions';
import { DeleteButton } from '@/components/admin/forms';
export default async function Messages() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw error;
  return (
    <>
      <div className="admin-top">
        <h1>Messages</h1>
        <span className="mono muted">LATEST 200</span>
      </div>
      {!data?.length && <div className="admin-empty">No messages yet.</div>}
      {data?.map((m) => (
        <article className="admin-message" key={m.id}>
          <header>
            <div>
              <strong>{m.name}</strong> {m.company && <span className="muted">/ {m.company}</span>}
              <br />
              <a className="text-link accent" href={'mailto:' + m.email}>
                {m.email}
              </a>
            </div>
            <span className="mono muted">
              {new Date(m.created_at).toISOString().slice(0, 16).replace('T', ' ')}
            </span>
          </header>
          <p>{m.message}</p>
          <div className="actions">
            {!m.read && (
              <form action={markRead.bind(null, m.id)}>
                <button className="button small">Mark read</button>
              </form>
            )}
            <DeleteButton table="contact_messages" id={m.id} />
          </div>
        </article>
      ))}
    </>
  );
}
