self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  clients.claim();
  // 刪除所有舊快取，避免卡住
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  // 完全不做快取，強制每次載入最新版本
  e.respondWith(fetch(e.request));
});
