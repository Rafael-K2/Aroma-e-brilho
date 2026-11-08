const V="ab-v12",SHELL=["./","index.html","admin.html","privacidade.html","termos.html","manifest.webmanifest","manifest-admin.webmanifest","icon-192.png","icon-512.png","logo.png","fotos/alvejante.jpg","fotos/sabao.jpg","fotos/amaciante.jpg","fotos/detergente.jpg","fotos/agua-sanitaria.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match(r.mode==="navigate"&&/admin/.test(r.url)?"admin.html":"index.html"))));
});
