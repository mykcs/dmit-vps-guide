const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [1280,900,440]){
   const page=await browser.newPage({viewport:{width,height:956},reducedMotion:'no-preference'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   let res=await page.goto((process.env.SITE_ORIGIN || 'http://127.0.0.1:4192/'),{waitUntil:'load'});
   assert.equal(res.status(),200);
   assert.equal(await page.locator('.button .action-icon').count(),2);
   assert.ok((await page.locator('.button .action-icon').first().boundingBox()).width>=23.5);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(overflow<=2,'horizontal overflow '+width+': '+overflow);
   const nav=page.locator('.desktop-nav a').first();
   if(width>780){
    const before=await nav.evaluate(el=>({r:el.getBoundingClientRect().toJSON(),bg:getComputedStyle(el).backgroundColor}));
    await nav.hover();await page.waitForTimeout(270);
    const after=await nav.evaluate(el=>({r:el.getBoundingClientRect().toJSON(),bg:getComputedStyle(el).backgroundColor}));
    assert.equal(after.r.width,before.r.width);assert.equal(after.r.height,before.r.height);
    assert.notEqual(before.bg,after.bg);
   }else{
    assert.equal(await nav.isVisible(),false);
   }
   const tab=page.locator('#tab-easy');assert.ok(await tab.count());
   await page.keyboard.press('Tab');await tab.focus();
   const focus=await tab.evaluate(el=>({visible:el.matches(':focus-visible'),width:getComputedStyle(el).outlineWidth}));
   assert.ok(parseFloat(focus.width)>=2);
   const others=page.locator('[role=tab]').filter({hasNotText:'Tailscale'});
   if(await others.count()){await others.first().click();assert.equal(await others.first().getAttribute('aria-selected'),'true');}
   const details=page.locator('.faq-list details').first();
   await details.locator('summary').click();assert.equal(await details.getAttribute('open'),'');
   assert.deepEqual(errors,[],'js errors');
   if(width!==900){await page.locator('body').click({position:{x:8,y:8}});await page.screenshot({path:'/tmp/dmit-craft-'+width+'.png',animations:'disabled'});}
   console.log('PASS width',width,'hover/focus/actions/FAQ/no-overflow');
   await page.close();
  }
  const p=await browser.newPage({reducedMotion:'reduce'});
  await p.goto((process.env.SITE_ORIGIN || 'http://127.0.0.1:4192/'),{waitUntil:'load'});
  assert.equal(await p.locator('.action-icon').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
  console.log('PASS reduced motion');
  await p.close();
 } finally{await browser.close()}
})().catch(e=>{console.error(e.stack);process.exit(1)});
