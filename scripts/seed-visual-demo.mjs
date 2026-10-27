// Local-only fictional preview content requested by the portfolio owner.
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url || !['localhost', '127.0.0.1'].includes(new URL(url).hostname))
  throw new Error('Local database only.');
const db = createClient(url, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const demos = [
  [
    'Orbit CRM',
    'orbit-crm',
    'Business Systems',
    '#c8eb96',
    '#273525',
    'Un CRM para organizar clientes, oportunidades y equipos.',
    'A CRM for customers, opportunities and teams.',
    ['nextjs', 'typescript', 'supabase'],
  ],
  [
    'Atlas AI',
    'atlas-ai',
    'AI',
    '#b8a8fb',
    '#302943',
    'Un asistente de IA para explorar documentos y encontrar respuestas.',
    'An AI assistant for exploring documents and finding answers.',
    ['react', 'python', 'openai'],
  ],
  [
    'Flowdesk',
    'flowdesk',
    'Automation',
    '#f3c481',
    '#3e3023',
    'Un editor visual que conecta tareas y servicios.',
    'A visual workflow editor connecting tasks and services.',
    ['nodejs', 'typescript', 'postgresql'],
  ],
  [
    'Nexo Commerce',
    'nexo-commerce',
    'Full Stack',
    '#8fdcdb',
    '#203b3b',
    'Una tienda conceptual con catálogo, carrito y gestión de productos.',
    'A concept store with a catalog, cart and product management.',
    ['nextjs', 'react', 'supabase'],
  ],
  [
    'Pulse Analytics',
    'pulse-analytics',
    'Web Apps',
    '#9bbaf3',
    '#25334a',
    'Un dashboard conceptual para explorar actividad y reportes.',
    'A concept dashboard for exploring activity and reports.',
    ['react', 'typescript', 'postgresql'],
  ],
];
const rect = (x, y, w, h, fill, r = 10) =>
  '<rect x="' +
  x +
  '" y="' +
  y +
  '" width="' +
  w +
  '" height="' +
  h +
  '" rx="' +
  r +
  '" fill="' +
  fill +
  '"/>';
const text = (x, y, s, size = 16, color = '#ebeee8') =>
  '<text x="' +
  x +
  '" y="' +
  y +
  '" fill="' +
  color +
  '" font-family="Arial, sans-serif" font-size="' +
  size +
  '">' +
  s +
  '</text>';
const line = (x, y, w) => rect(x, y, w, 7, '#ffffff20', 3);
function cover(d, i) {
  const [name, slug, , accent, bg] = d;
  let ui = '';
  if (i === 0)
    for (let c = 0; c < 3; c++) {
      const x = 300 + c * 250;
      ui +=
        rect(x, 255, 228, 310, '#ffffff05') +
        text(x + 18, 287, ['New leads', 'In progress', 'Review'][c], 15, accent);
      for (let r = 0; r < 3; r++)
        ui +=
          rect(x + 12, 309 + r * 78, 204, 64, '#242b28') +
          rect(x + 25, 325 + r * 78, 25, 25, accent, 7) +
          line(x + 63, 328 + r * 78, 113) +
          line(x + 63, 345 + r * 78, 74);
    }
  if (i === 1) {
    ui += rect(410, 253, 568, 63, '#51446d') + text(437, 291, 'What can we build together?', 20);
    ui +=
      rect(300, 342, 641, 154, '#24242e') +
      text(329, 381, 'ATLAS / YOUR WORKSPACE ASSISTANT', 13, accent);
    for (let n = 0; n < 3; n++) ui += line(329, 405 + n * 22, 530 - n * 60);
    ui +=
      rect(300, 532, 728, 52, '#ffffff08') +
      text(322, 565, 'Ask a question about your documents...', 15, '#adb0b8') +
      rect(977, 542, 34, 32, accent, 7) +
      text(988, 564, '+', 22, '#222');
  }
  if (i === 2) {
    ui +=
      '<path d="M470 388H600M770 388H900" stroke="' +
      accent +
      '" stroke-width="3" stroke-dasharray="6 6"/>';
    ['Trigger', 'Transform', 'Deliver'].forEach((label, n) => {
      const x = 300 + n * 260;
      ui +=
        rect(x, 327, 205, 130, '#282821') +
        rect(x + 20, 347, 36, 36, accent) +
        text(x + 20, 420, label, 20);
    });
    ui +=
      text(300, 500, 'WHEN AN EVENT HAPPENS, YOUR SYSTEM MOVES.', 13, accent) + line(300, 531, 490);
  }
  if (i === 3)
    for (let n = 0; n < 3; n++) {
      const x = 300 + n * 250;
      ui +=
        rect(x, 255, 226, 310, '#ffffff06') +
        rect(x + 12, 267, 202, 196, ['#36585a', '#314748', '#49665c'][n]);
      ui +=
        '<circle cx="' +
        (x + 113) +
        '" cy="362" r="' +
        (47 + n * 6) +
        '" fill="' +
        accent +
        '" opacity="' +
        (0.8 - n * 0.15) +
        '"/>';
      ui +=
        text(x + 18, 499, ['Everyday collection', 'Studio essentials', 'Made for focus'][n], 16) +
        line(x + 18, 518, 125) +
        text(x + 18, 549, 'VIEW CONCEPT', 11, accent);
    }
  if (i === 4) {
    ['Activity', 'Audience', 'Reports'].forEach((label, n) => {
      ui +=
        rect(300 + n * 250, 248, 228, 78, '#ffffff06') +
        text(319 + n * 250, 280, label, 15, '#aebbd0') +
        line(319 + n * 250, 297, 95);
    });
    ui += rect(300, 348, 728, 217, '#ffffff04');
    for (let n = 0; n < 12; n++) {
      const h = [40, 70, 58, 98, 84, 129, 115, 143, 131, 163, 152, 181][n];
      ui += rect(326 + n * 56, 548 - h, 28, h, accent, 5);
    }
  }
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">' +
    rect(0, 0, 1200, 760, bg, 0) +
    text(70, 66, '0' + (i + 1) + ' / FICTIONAL CONCEPT', 14, accent) +
    text(1080, 66, 'DEMO', 14, accent) +
    rect(66, 110, 1068, 532, '#0f1518', 18) +
    rect(66, 110, 1068, 47, '#ffffff08', 18) +
    '<circle cx="93" cy="134" r="5" fill="#ff9386"/><circle cx="112" cy="134" r="5" fill="#efcb84"/><circle cx="131" cy="134" r="5" fill="#a9dba2"/>' +
    text(500, 139, 'concept-preview / ' + slug, 12, '#9aa3a7') +
    rect(86, 177, 178, 445, '#ffffff03') +
    text(107, 219, name, 20, accent) +
    text(107, 286, 'Overview', 14) +
    text(107, 328, 'Workspace', 14, '#838d93') +
    text(107, 370, 'Settings', 14, '#838d93') +
    text(
      300,
      218,
      [
        'Your pipeline, in focus.',
        'Make knowledge useful.',
        'Less repetition. More flow.',
        'Thoughtful things.',
        'A clearer picture.',
      ][i],
      27,
    ) +
    ui +
    text(70, 707, name, 34) +
    text(730, 705, 'VISUAL MOCKUP / NOT A REAL PRODUCT', 12, accent) +
    '</svg>'
  );
}
function checked(r) {
  if (r.error) throw new Error(r.error.message);
  return r.data;
}
const technologies = checked(await db.from('technologies').select('id,slug'));
for (const [i, d] of demos.entries()) {
  const [name, slug, category, , , es, en, tech] = d;
  const project = checked(
    await db
      .from('projects')
      .upsert(
        {
          slug: 'visual-demo-' + slug,
          title_en: name + ' · Demo',
          title_es: name + ' · Demo',
          short_description_es: 'Demo ficticia · ' + es,
          short_description_en: 'Fictional demo · ' + en,
          description_es:
            'Proyecto ficticio de demostración. Esta maqueta solo sirve para visualizar el portafolio; no representa un producto desarrollado, un cliente ni resultados reales. ' +
            es,
          description_en:
            'Fictional demonstration project. This mockup only previews the portfolio; it does not represent a built product, a client or real results. ' +
            en,
          project_type: 'Fictional demo / Demo ficticia',
          category,
          status: 'in-progress',
          year: 2026,
          published: true,
          featured: true,
          featured_order: i + 1,
          display_order: i + 1,
          repository_visibility: 'none',
          live_url: '',
          github_url: '',
          external_url: '',
          video_url: '',
        },
        { onConflict: 'slug' },
      )
      .select('id')
      .single(),
  );
  const path = project.id + '/visual-demo-cover.png';
  const bytes = await sharp(Buffer.from(cover(d, i)))
    .png()
    .toBuffer();
  checked(
    await db.storage
      .from('portfolio')
      .upload(path, bytes, { contentType: 'image/png', upsert: true }),
  );
  checked(
    await db
      .from('project_media')
      .upsert(
        {
          project_id: project.id,
          storage_path: path,
          kind: 'image',
          is_cover: true,
          alt_es: 'Maqueta ficticia de ' + name + '. Solo demostración visual.',
          alt_en: 'Fictional ' + name + ' mockup. Visual demonstration only.',
          display_order: 0,
        },
        { onConflict: 'storage_path' },
      ),
  );
  const links = tech.map((slug) => {
    const t = technologies.find((t) => t.slug === slug);
    if (!t) throw new Error('Missing technology: ' + slug);
    return { project_id: project.id, technology_id: t.id };
  });
  checked(
    await db.from('project_technologies').upsert(links, { onConflict: 'project_id,technology_id' }),
  );
  process.stdout.write('Created local visual demo: ' + name + '\n');
}
