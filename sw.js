// sw.js — v3 (cache-busting + network-first)
const CACHE_NAME = 'seth2-app-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

// 安裝 SW：預先快取
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// 啟用 SW：刪除舊快取
self.addEventListener('activate', (e) => {
  clients.claim();
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
});

// Network First：線上優先，離線用快取
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, respClone));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
