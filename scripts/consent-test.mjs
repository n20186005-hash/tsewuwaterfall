import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const inline = p => fs.readFileSync(p,'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
const runtime=inline('src/layouts/BaseLayout.astro'), ui=inline('src/pages/pengaturan-cookie.astro');
const key='tumpakSewuCookieConsent';
function setup({localFail=false,sessionFail=false,initial=true,readFail=false}={}) {
 const local=new Map(initial?[[key,JSON.stringify({analytics:true})]]:[]), session=new Map(), appended=[], elements={};
 const storage=(map,fail)=>({getItem:k=>{if(readFail)throw Error("read blocked");return map.get(k)||null},setItem(k,v){if(fail)throw Error('blocked');map.set(k,v)},removeItem(k){if(fail)throw Error('blocked');map.delete(k)}});
 const c={localStorage:storage(local,localFail),sessionStorage:storage(session,sessionFail),document:{head:{appendChild:s=>appended.push(s)},createElement:()=>({}),getElementById:id=>elements[id] ||= {checked:false,textContent:'',addEventListener(e,f){this[e]=f}}},Date};c.window=c;vm.createContext(c);vm.runInContext(runtime,c);vm.runInContext(ui,c);return {c,local,session,appended,elements};
}
for(const options of [{},{localFail:true},{localFail:true,sessionFail:true}]) {
 const x=setup(options);assert.equal(x.appended.length,1);x.elements['reject-cookie'].click();assert.equal(x.c['ga-disable-G-HXM22WWPKP'],true);assert.equal(x.c.readTumpakConsent().analytics,false);assert.equal(x.elements['analytics-toggle'].checked,false);
 const command=x.c.dataLayer.at(-1);assert.equal(command[0],'consent');assert.equal(command[2].analytics_storage,'denied');
 vm.runInContext(runtime,x.c);assert.equal(x.appended.length,1);assert.equal(x.c.readTumpakConsent().analytics,false);
 if(options.localFail&&!options.sessionFail) {delete x.c.setTumpakAnalytics;vm.runInContext(runtime,x.c);assert.equal(x.c.readTumpakConsent().analytics,false);assert.equal(x.appended.length,1);}
 x.elements['analytics-toggle'].checked=true;x.elements['save-cookie'].click();assert.equal(x.c['ga-disable-G-HXM22WWPKP'],false);assert.equal(x.c.dataLayer.at(-1)[2].analytics_storage,'granted');
 // Same loaded document regrant must not add a loader.
 assert.equal(x.appended.length,1);
}
const first=setup({initial:false});assert.equal(first.appended.length,0);first.elements['analytics-toggle'].checked=true;first.elements['save-cookie'].click();assert.equal(first.appended.length,1);
console.log('Consent VM passed: stored grant, immediate withdrawal, old grant readable/local write blocked, both storage writes blocked, session veto on navigation runtime, re-entry, allow-deny-allow and one loader.');

const blockedRead=setup({readFail:true});assert.equal(blockedRead.appended.length,0);blockedRead.elements['reject-cookie'].click();assert.equal(blockedRead.c['ga-disable-G-HXM22WWPKP'],true);
const bad=setup({initial:false});bad.local.set(key,'{bad');delete bad.c.setTumpakAnalytics;vm.runInContext(runtime,bad.c);assert.equal(bad.appended.length,0);
console.log('Additional fail-closed checks passed: both storage reads blocked and malformed stored preferences.');
