const CACHE_NAME = "habit-cache-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(FILES_TO_CACHE)
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});