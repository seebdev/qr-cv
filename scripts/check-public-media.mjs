import {createClient} from '@supabase/supabase-js';
const u=process.env.NEXT_PUBLIC_SUPABASE_URL;
if(!['localhost','127.0.0.1'].includes(new URL(u).hostname)) throw Error('Local only');
const db=createClient(u,process.env.SUPABASE_SECRET_KEY,{auth:{persistSession:false}});
const {data,error}=await db.from('projects').select('published,project_media(id)').limit(20);
if(error) throw error;
for(const p of data) for(const m of p.project_media.slice(0,1)) {
 const r=await fetch('http://localhost:4563/api/media/'+m.id);
 if(r.status !== (p.published?200:404)) throw Error('Visibility mismatch '+r.status);
}
for(const path of ['espanol','english']) {
 const r=await fetch('http://localhost:4563/cv/cv-sebastian-solorzano-'+path+'.pdf');
 if(r.status!==200 || !(r.headers.get('content-type')||'').includes('pdf')) throw Error('PDF missing');
}
console.log('Public media works; draft media stays private; both PDFs download.');
