import { firebaseApp } from './firebaseConfig';
import { GoogleAuthProvider, User, getAuth, getRedirectResult } from 'firebase/auth';

import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

const auth = getAuth(firebaseApp);

export default function FirebaseProvider(children: { children: any }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken
          console.log(credential);
          console.log(result);
          window.location.replace(`http://localhost:3000?token=${credential?.accessToken}`);
          // create user in db
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        auth.signOut();
        setUser(null);
      }
    });
  }, []);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      auth: auth,
      user: user
    })
  );

  return childrenWithProps;
}
