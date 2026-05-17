// Service Worker for 鋼材JIS規格 早見表
// バージョンを上げると古いキャッシュが自動破棄される

const CACHE_VERSION = 'v3.0.0';
const CACHE_NAME = `steel-jis-${CACHE_VERSION}`;

// オフラインで必要な全リソース
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './icon-maskable-512.png'
];

// インストール時:全リソースをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// 有効化時:古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// fetch:キャッシュ優先、無ければネットワーク
self.addEventListener('fetch', (event) => {
  // POST等はそのまま通す
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // 同一オリジンのみキャッシュに追加
        if (response.ok && new URL(event.request.url).origin === location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // オフライン時、HTMLリクエストはindex.htmlを返す(SPA的フォールバック)
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
