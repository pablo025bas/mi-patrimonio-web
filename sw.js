// Service worker de Mi Patrimonio: deja abrir la app sin conexión.
// Estrategia: red primero (así siempre llega la última versión) y, si no hay red, la copia guardada.
// Solo toca archivos de la propia app; las llamadas a Microsoft, a OneDrive y a los CDN no pasan por aquí.
const V = 'patrimonio-v3';
// Librerías de importación (Excel y PDF): se guardan la primera vez para poder importar extractos sin conexión.
const CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com'];
const BASE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(BASE)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  const u = new URL(r.url);
  if (r.method === 'GET' && CDN.includes(u.hostname)) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })));
    return;
  }
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(
    // sin la caché HTTP del navegador (GitHub Pages la guarda 10 min): siempre la versión publicada
    fetch(r.url, { cache: 'no-store', credentials: 'same-origin' }).then(res => { if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r).then(m => m || caches.match('./')))
  );
});
