// import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
// import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
//   };

// // Initialize Firebase
// let firebaseApp;
// if(!getApps().length) firebaseApp = initializeApp(firebaseConfig);
// else {
//     firebaseApp = getApp();
//     deleteApp(firebaseApp);
//     firebaseApp = initializeApp(firebaseConfig);
// }

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(firebaseApp);
