self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/lavoiedusalut1.5/',
                '/lavoiedusalut1.5/index.html',
                '/lavoiedusalut1.5/styles.css',
                '/lavoiedusalut1.5/script.js',
                '/lavoiedusalut1.5/logo.png',
                '/lavoiedusalut1.5/manifest.json',
                '/lavoiedusalut1.5/logo-192.png',
                '/lavoiedusalut1.5/logo-512.png',
                '/lavoiedusalut1.5/offline.html'
            ]).catch((err) => {
                console.warn('Failed to cache some resources:', err);
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                console.warn('Network fetch failed for:', event.request.url);
                return caches.match('/lavoiedusalut1.5/offline.html');
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== 'v1')
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});
