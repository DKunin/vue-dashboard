'use strict';

var CACHE_NAME = 'vue-dashboard';

// File want to cache
var urlsToCache = [
    'http://127.0.0.1:8080',
    './',
    './#/dashboard/0',
    './#/dashboard',
    './#',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css',
    'https://npmcdn.com/tachyons@4.6.1/css/tachyons.min.css',
    './styles/styles.css',
    'https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.0/vue.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.5.3/vue-router.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.3.1/vue-resource.min.js',
    './scripts/directives/visibilityUpdate.js',
    './scripts/focusIcon.js',
    './scripts/dashCard.js',
    './scripts/favIcon.js',
    './scripts/tasksList.js',
    './scripts/tasksListReport.js',
    './scripts/stashList.js',
    './scripts/planList.js',
    './scripts/dashboard.js',
    './scripts/settings.js',
    './scripts/mainApp.js',
    './scripts/changedFilesList.js',
    './service-worker-loader.js',
    './service-worker.js',
    './index.html',
    './manifest.json'
];

// Set the callback for the install step
self.oninstall = function(e) {
    console.log('[serviceWorker]: Installing...'); // eslint-disable-line no-console
    // perform install steps
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                console.log('[serviceWorker]: Cache All'); // eslint-disable-line no-console
                console.log('cache', urlsToCache); // eslint-disable-line no-console
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                console.log(
                    // eslint-disable-line no-console
                    '[serviceWorker]: Intalled And Skip Waiting on Install'
                );
                return self.skipWaiting();
            })
    );
};

self.onfetch = function(e) {
    console.log('[serviceWorker]: Fetching ' + e.request.url); // eslint-disable-line no-console
    var raceUrl = 'API/';

    if (!e.request.url.includes(raceUrl)) {
        e.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(e.request)
                    .then(function(res) {
                        cache.put(e.request.url, res.clone());
                        return res;
                    })
                    .catch(err => {
                        console.log('[serviceWorker]: Fetch Error ' + err); // eslint-disable-line no-console
                    });
            })
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(function(res) {
                return res || fetch(e.request);
            })
        );
    }
};

self.onactivate = function(e) {
    console.log('[serviceWorker]: Actived'); // eslint-disable-line no-console

    var whiteList = [CACHE_NAME];

    e.waitUntil(
        caches
            .keys()
            .then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (whiteList.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(function() {
                console.log('[serviceWorker]: Clients Claims'); // eslint-disable-line no-console
                return self.clients.claim();
            })
    );
};
