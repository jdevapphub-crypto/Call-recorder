const CACHE_NAME = "call-recorder-v2-FIXED"; // changed v1 to v2
const FILES = ["./", "./index.html", "./icon.png", "./manifest.json"];

self.addEventListener("install", e => {
  self.skipWaiting(); // force update immediately
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
});

self.addEventListener("activate", e => {
  // DELETE old cache v1
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
