import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  initializeAuth,
  indexedDBLocalPersistence,
} from 'firebase/auth';
import {
  f7,
} from 'framework7-react';
import firebaseConfiguration from './firebaseConfiguration';

const firebaseConfig = firebaseConfiguration;

const app = initializeApp(firebaseConfig);

const isIos = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPad|iPhone|iPod/i.test(userAgent)) return true;
  return false;
};

const getFirebaseAuth = () => {
  let auth;
  if (isIos()) {
    auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  } else {
    auth = getAuth(app);
  }
  return auth;
};

const auth = getFirebaseAuth();

const logIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      if (/[a-z.]+@asial.co.jp/.test(user.email)) {
        f7.views.current.router.navigate('/event', {
          reloadAll: true,
          browserHistory: false,
          ignoreCache: true,
        });
      } else {
        f7.views.current.router.navigate('/list', {
          reloadAll: true,
          browserHistory: false,
          ignoreCache: true,
        });
      }
      return user;
    })
    .catch(() => {
      f7.dialog.alert('User or password incorrect.', 'Error');
    });
};

export default logIn;
