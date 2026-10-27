import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const base=process.env.CAPTURE_URL||'http://localhost:4563';
await fs.mkdir('docs/redesign',{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [label,width,height]of [['desktop',1440,1000],['mobile',390,844],['tablet',768,1024],['narrow',320,740]]){
 await page.setViewportSize({width,height});await page.goto(base+'/es',{waitUntil:'networkidle'});
 await page.locator('.project-card img').first().evaluate(img=>img.decode());
 await page.screenshot({path:'docs/redesign/'+label+'.png'});
 if(label==='desktop'||label==='mobile'){
 await page.addStyleTag({content:'main>.section{content-visibility:visible!important}'});
 for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(100)}
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'docs/redesign/'+label+'-full.png',fullPage:true});
 }
 console.log(label,await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth})));
}
await page.goto(base+'/ja/projects/crepes-waffles',{waitUntil:'networkidle'});await page.screenshot({path:'docs/redesign/case-japanese.png',fullPage:true});
console.log('Page errors:',errors);await browser.close();
