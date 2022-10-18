const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const GET_CACHE_NAME = 'get-cache-v1.1';

self.addEventListener('install',(event) => {
    console.log('SW: Instalado');

    const promiseCache = caches.open(STATIC_CACHE_NAME)
    .then((cache) => {
        return cache.addAll(
            [
                './',
                './index.html',
                './css/style.css'
                // './js/app.js'
            ]
        );
    })

  
    const promiseCacheInmutable = caches.open(INMUTABLE_CACHE_NAME)
    .then((cache) => {
        return cache.addAll(
            [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
                'https://e.rpp-noticias.io/normal/2015/12/24/160616_51464.jpg',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.ttf',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2'

                
            ]
        );
    })

    event.waitUntil(Promise.all([promiseCache,promiseCacheInmutable]));

});


self.addEventListener('fetch',(event) => {

    const respCache = caches.match(event.request)

    event.respondWith(respCache);
});



