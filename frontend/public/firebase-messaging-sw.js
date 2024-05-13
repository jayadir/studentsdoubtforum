importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA69ysxObYEpK4LbpjGLa6Wb9xjfE0UWXQ",
  authDomain: "doubt-port.firebaseapp.com",
  projectId: "doubt-port",
  storageBucket: "doubt-port.appspot.com",
  messagingSenderId: "22871272546",
  appId: "1:22871272546:web:9ca1fcda21de279961353b",
  measurementId: "G-JTN8H2WFSZ",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Add this below your firebase initialization
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

try {
  messaging.onBackgroundMessage((payload) => {
    console.log("received message in service worker");

    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    console.log("received message in service worker");
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  messaging.onMessage((payload) => {
    console.log("Message received in foreground", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };

    if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      new Notification(notificationTitle, notificationOptions);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          new Notification(notificationTitle, notificationOptions);
        }
      });
    }
  });
} catch (e) {
  console.log(e);
}
