// 停用快取，永遠抓最新
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => clients.claim());

self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request));
});
