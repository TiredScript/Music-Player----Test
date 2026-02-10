const cacheName = "music-player-cache-v1";
const assetsToCache = [
    "/musicPlayer/index.html",
    "/musicPlayer/style.css",
    "/musicPlayer/script.js",
    "/musicPlayer/media/Addison Rae - Fame is a Gun (Official Video).mp3",
    "/musicPlayer/media/jtmusic.png",
    // add all your other songs & images
];

// Install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

// Activate
self.addEventListener("activate", (event) => {
    console.log("Service Worker activated");
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            return res || fetch(event.request);
        })
    );
});
