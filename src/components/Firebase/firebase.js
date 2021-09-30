import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

/* Firebase APIs */

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);

// *** Auth API ***

export const doSendEmailVerification = () =>
  sendEmailVerification(auth.currentUser, {
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
  });

// *** User API ***

export const user = uid => ref(db, `users/${uid}`);

export const users = () => ref(db, 'users');

// *** Merge Auth and DB User API *** //

export const onAuthUserListener = (next, fallback) =>
  onAuthStateChanged(
    auth,
    authUser => {
      if (authUser) {
        onValue(user(authUser.uid), snapshot => {
          const dbUser = snapshot.val();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          };

          next(authUser);
        }, {
          onlyOnce: true
        });
      } else {
        fallback();
      }
    },
  );

// *** Equipment API ***

export const equipment = uid => ref(db, `equipments/${uid}`);

export const equipments = () => ref(db, 'equipments');
