// import { writable } from "svelte/store";
// import { authModalStore } from "../stores/appStore";
// import { auth } from "../lib/firebase/firebase.client";
// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   sendSignInLinkToEmail,
//   signInWithEmailAndPassword,
//   signOut,
//   updateEmail,
//   updatePassword,
// } from "firebase/auth";
// import { push } from "svelte-spa-router";

// const gitHubProvider = new GithubAuthProvider();
// const googleProvider = new GoogleAuthProvider();

// export const authStore = writable({
//   isLoading: true,
//   currentUser: null,
// });

// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for this
//   // URL must be in the authorized domains list in the Firebase Console.
//   // url: 'https://svelte-auth-with-firebase.vercel.app/', // Prod
//   url: "http://localhost:5173/#/LostCredentials", // Dev

//   // This must be true.
//   handleCodeInApp: true,
//   // iOS: {
//   //   bundleId: 'com.example.ios'
//   // },
//   // android: {
//   //   packageName: 'com.example.android',
//   //   installApp: true,
//   //   minimumVersion: '12'
//   // },
//   // dynamicLinkDomain: 'example.page.link'
// };

// export const authHandlers = {
//   signup: async (email, password) => {
//     await createUserWithEmailAndPassword(auth, email, password);
//   },
//   login: async (email, password) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   },
//   logout: async () => {
//     await signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//         console.log("Sign-out successful");
//       })
//       .catch((error) => {
//         // An error happened.
//         console.log("An error happened: " + error);
//       });
//   },
//   resetPassword: async (email) => {
//     await sendPasswordResetEmail(auth, email);
//   },
//   updateEmail: async (email) => {
//     await updateEmail(auth.currentUser, email);
//   },
//   updatePassword: async (password) => {
//     await updatePassword(auth.currentUser, password);
//   },
//   lostPassword: async (email) => {
//     await sendSignInLinkToEmail(auth, email, actionCodeSettings);
//   },
//   googleSignIn: async () => {
//     await signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         authModalStore.set(false);
//         push("/Profile");
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;

//         // The signed-in user info.
//         const user = result.user;
//         // console.log("user: --------------------------/n" + JSON.stringify(user));
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       })
//       .catch((error) => {
//         authModalStore.set(false);
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   },
//   gitHubSignIn: async () => {
//     await signInWithPopup(auth, gitHubProvider)
//       .then((result) => {
//         authModalStore.set(false);
//         push("/Profile");
//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         const credential = GithubAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;

//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GithubAuthProvider.credentialFromError(error);
//         // ...
//       });
//   },
// };
