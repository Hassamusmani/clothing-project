import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBjKy7Og1QeQWmcDKR6bsGyP2I5MSqPCBQ",
  authDomain: "clothing-brand-2945d.firebaseapp.com",
  projectId: "clothing-brand-2945d",
  storageBucket: "clothing-brand-2945d.appspot.com",
  messagingSenderId: "1003468462926",
  appId: "1:1003468462926:web:20fbd059cacb45c2469c1f",
  measurementId: "G-M9364MQVRV"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
}