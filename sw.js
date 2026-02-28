const CACHE_NAME = 'adbp-v25';
const assets = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => {
      return Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Obrigatório para o Chrome ativar instalação
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});