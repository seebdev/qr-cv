import { redirect } from 'next/navigation';
export default async function ProjectAlias({ params }: { params: Promise<{ slug: string }> }) {
  redirect('/en/projects/' + (await params).slug);
}
