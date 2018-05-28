self.addEventListener('install', event => {
  event.waitUntil(
    // Opening a named cache autovivifies the actual cache.
    caches.open('leanCanvas').then(cache => {
      return cache.addAll([
        ".",
        "https://cdnjs.cloudflare.com/ajax/libs/pouchdb/6.4.3/pouchdb.min.js",
        "https://fonts.googleapis.com/icon?family=Material+Icons"
      ]);
    })
  );
});

// Handle (intercept) requests.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Prioritise cached file || if not found then fetch new file.
      return response || fetch(event.request);
      // This would be in the opposite order for an app with frequently updated resources.
    })
  );
});
