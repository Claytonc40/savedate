self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalado');

  // Pré-cache de recursos essenciais
  event.waitUntil(
    caches.open('static-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.ico',
        '/manifest.json',
        '/icon-192x192.png',
        '/icon-384x384.png',
        // Inclua aqui todos os arquivos estáticos que você deseja cachear
      ]);
    }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativado');

  // Limpar caches antigos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== 'static-cache-v1') {
            console.log('Service Worker: Limpando Cache Antigo', cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Buscando', event.request.url);

  // Responder com recursos do cache, ou buscar da rede
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            return caches.open('dynamic-cache-v1').then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
      .catch(() => caches.match('/offline.html')), // Retorna uma página offline quando não há conexão
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push recebido:', data);

  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
