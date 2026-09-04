self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

// האזנה להודעות Push אמיתיות מהענן באייפון ובאנדרואיד
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : { title: 'Pulse', body: 'הודעה חדשה' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icon.png',
      badge: 'icon.png',
      dir: 'rtl',
      vibrate: [200, 100, 200]
    })
  );
});
