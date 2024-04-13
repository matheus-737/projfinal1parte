var cacheName = 'pwaTeste-v1.0';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './index.html',
        './index.css',
        './registro.html',
        './registro.css',
        './historico.html',
        
        
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== cacheName).map(name => {
          return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .then(fetchResponse => {
            return caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
          });
      }).catch(error => {
        // Caso não haja conexão de rede e o recurso não esteja em cache
        console.error('Fetch failed; returning offline page instead.', error);
        return caches.match('/offline.html');
      })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
