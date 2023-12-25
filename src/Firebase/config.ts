// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// // Configure Firebase.
// const config = {
//   apiKey: 'AIzaSyAu_5p0p3ycABtEcLxW081dnTkmVDugkFA',
//   authDomain: 'life-operations.firebaseapp.com',
//   projectId: 'life-operations',
//   storageBucket: 'life-operations.appspot.com',
//   messagingSenderId: '860078091377',
//   appId: '1:860078091377:web:b71777a00540ed8d43bfd0',
//   measurementId: 'G-TZ8QQ5VKJR'
// };

// export const firebaseApp = initializeApp(config);
// export const analytics = getAnalytics(firebaseApp);

// import admin from 'firebase-admin';

// // Initialize the Firebase Admin SDK with your service account credentials
// const serviceAccount = require('path/to/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
//   // Add your Firebase project config here
// });

// // Verify the Firebase access token
// export async function verifyToken(accessToken: string) {
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(accessToken);
//     return decodedToken;
//   } catch (error) {
//     console.error('Error verifying access token:', error);
//     throw error;
//   }
// }
