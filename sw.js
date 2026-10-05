// Service worker de Mi Patrimonio: deja abrir la app sin conexión.
// Estrategia: red primero (así siempre llega la última versión) y, si no hay red, la copia guardada.
// Solo toca archivos de la propia app; las llamadas a Microsoft, a OneDrive y a los CDN no pasan por aquí.
const V = 'patrimonio-v1';
const BASE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(BASE)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r).then(m => m || caches.match('./')))
  );
});
