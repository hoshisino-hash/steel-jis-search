// Service Worker for 昇降機検査員クエスト
// バージョンを上げると古いキャッシュが自動破棄される

const CACHE_VERSION = 'v1.2.0';
const CACHE_NAME = `liftquest-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k.startsWith('liftquest-') && k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const req = event.request;
  const url = new URL(req.url);
  const isHtml = req.mode === 'navigate' || req.destination === 'document';
  // 問題データ(data.js)もHTML同様 network-first にして告示改正時の差替えを即時反映
  const isData = url.pathname.endsWith('/data.js');

  if (isHtml || isData) {
    event.respondWith(
      fetch(req).then((response) => {
        if (response.ok && url.origin === location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return response;
      }).catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  // それ以外(アイコン・マニフェスト等): cache-first。
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((response) => {
        if (response.ok && url.origin === location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return response;
      });
    })
  );
});
