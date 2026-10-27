-- Technology catalog only. No invented projects, experience, clients, or metrics.
insert into public.technologies(name,slug) values
('Next.js','nextjs'),('React','react'),('TypeScript','typescript'),('JavaScript','javascript'),
('Node.js','nodejs'),('PostgreSQL','postgresql'),('Supabase','supabase'),('Prisma','prisma'),
('Python','python'),('OpenAI','openai'),('ElevenLabs','elevenlabs'),('Docker','docker'),
('GitHub','github'),('Render','render') on conflict(slug) do nothing;