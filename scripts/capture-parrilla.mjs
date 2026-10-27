import { chromium } from '@playwright/test';
const browser = await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:710}});
await page.goto('http://127.0.0.1:4565/cliente?r=la-parrilla', {waitUntil:'networkidle',timeout:90000});
await page.locator('h1').waitFor();
await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
console.log(await page.locator('h1').innerText());
await page.screenshot({path:'.local/redesign-media/la-parrilla-real.png'});
await browser.close();
