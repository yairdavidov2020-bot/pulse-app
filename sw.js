const CACHE_NAME = 'pulse-cache-v3';
const LOCAL_ASSETS = [
  '/pulse-app/',
  '/pulse-app/index.html'
];

// שלב ההתקנה - שמירת הקבצים עם הנתיב המלא של התיקייה בגיטה
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(LOCAL_ASSETS);
    }).catch(err => console.log('Cache add failed:', err))
  );
  self.skipWaiting();
});

// ניקוי מטמון ישן בעת הפעלה
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// טיפול בבקשות רשת ותמיכה באופליין במסך הבית
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // במצב אופליין, מחזיר את ה-index.html מהמטמון של התיקייה
        if (event.request.mode === 'navigate') {
          return caches.match('/pulse-app/index.html');
        }
      });
    })
  );
});
