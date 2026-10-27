import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
if(!url || !['localhost','127.0.0.1'].includes(new URL(url).hostname)) throw Error('Local only');
const db=createClient(url,process.env.SUPABASE_SECRET_KEY,{auth:{persistSession:false}});
const check=({data,error})=>{if(error) throw error;return data};
const p=check(await db.from('projects').select('id,project_media(*)').eq('slug','la-parrilla').single());
if(p.project_media.some(m=>m.is_cover)) {console.log('Existing cover preserved');process.exit(0);}
const buffer=await sharp('.local/redesign-media/la-parrilla-real.png').resize({width:1440}).webp({quality:85}).toBuffer();
const path=p.id+'/site-capture.webp';
check(await db.storage.from('portfolio').upload(path,buffer,{contentType:'image/webp',upsert:true}));
check(await db.from('project_media').upsert({project_id:p.id,storage_path:path,kind:'image',alt_es:'La Parrilla — captura del menú original',alt_en:'La Parrilla — original menu screenshot',is_cover:true,display_order:0},{onConflict:'storage_path'}));
console.log('La Parrilla: real cover saved');
