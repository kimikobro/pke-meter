
const CACHE_NAME = "pke-meter-v1";

const FILES_TO_CACHE = [
  "/pke-meter/",
  "/pke-meter/index.html",
  "/pke-meter/manifest.json",
  "/pke-meter/pke-icon-192.png",
  "/pke-meter/pke-icon-512.png",
  "/pke-meter/pke%20funcionamiento.mp3",
  "/pke-meter/detected-beep.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(FILES_TO_CACHE)
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
