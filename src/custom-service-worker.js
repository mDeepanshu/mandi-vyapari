// Import Angular's default service worker
importScripts('./ngsw-worker.js');

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push received:', event);

  let data = {};
  if (event.data) {
    data = event.data.json(); // The payload sent from your Node.js backend
  }

  const options = {
    body: data.body || 'You have a new message!',
    icon: '/assets/icons/icon-72x72.png', // your app icon
    badge: '/assets/icons/icon-72x72.png',
    data: data.url || '/' // optional: open this URL when clicked
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'New Notification', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});
