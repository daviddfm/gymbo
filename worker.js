// Cloudflare Worker relay. Secrets: GYMBO_WEBHOOK_URL, GYMBO_WEBHOOK_TOKEN (wrangler secret put ...)
const CORS={'Access-Control-Allow-Origin':'https://daviddfm.github.io','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
export default{async fetch(req,env){if(req.method==='OPTIONS')return new Response(null,{headers:CORS});
if(req.method!=='POST')return new Response('gymbo relay',{headers:CORS});const body=await req.text();if(body.length>20000)return new Response('too big',{status:413,headers:CORS});
const r=await fetch(env.GYMBO_WEBHOOK_URL,{method:'POST',headers:{'Authorization':'Bearer '+env.GYMBO_WEBHOOK_TOKEN,'Content-Type':'application/json'},body});
return new Response(String(r.status),{status:r.ok?200:502,headers:CORS})}}
