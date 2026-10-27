/** Writes require the local test instance, or an explicitly authorized remote test target. */
export function hasTestDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !process.env.SUPABASE_SECRET_KEY) return false;
  if (
    !['127.0.0.1', 'localhost'].includes(new URL(url).hostname) &&
    process.env.ALLOW_REMOTE_TESTS !== 'true'
  ) {
    throw new Error('Writing E2E tests require local Supabase or ALLOW_REMOTE_TESTS=true.');
  }
  return true;
}
