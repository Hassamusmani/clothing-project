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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

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

export const convertSnapshotToMap = (collections) => {
  const transformedData = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  });

  return transformedData.reduce((accumulator, collection ) => {
    accumulator[collection.routeName] = collection;
    return accumulator;
  },{});
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}