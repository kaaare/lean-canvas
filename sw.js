self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('leanCanvas').then(function(cache) {
     return cache.addAll([
       ".",
       "https://cdnjs.cloudflare.com/ajax/libs/pouchdb/6.4.3/pouchdb.min.js"
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
