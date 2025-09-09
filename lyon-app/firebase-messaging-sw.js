// firebase-messaging-sw.js (ponelo en la raíz /)
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAegBnufw0k1qcfEFdtZKKsg_4OKa4lHIU",
  authDomain: "lyon-c8c09.firebaseapp.com",
  projectId: "lyon-c8c09",
  storageBucket: "lyon-c8c09.firebasestorage.app",
  messagingSenderId: "122924191899",
  appId: "1:122924191899:web:45d96dcb99d1524072f63e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification.title || 'Notificación';
  const options = {
    body: payload.notification.body || '',
    icon: '/icon.png'
  };
  self.registration.showNotification(title, options);
});