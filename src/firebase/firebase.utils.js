import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCa_2xkueGO8t13sdG7XEZnndVtesYO9bQ',
  authDomain: 'emc-db.firebaseapp.com',
  databaseURL: 'https://emc-db.firebaseio.com',
  projectId: 'emc-db',
  storageBucket: 'emc-db.appspot.com',
  messagingSenderId: '903288983758',
  appId: '1:903288983758:web:0aa72c0d60abad988b809f'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDoc = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

export const convertCollectionSnapshotToMap = collectionsSnapshot => {
  const transformCollection = collectionsSnapshot.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    };
  });

  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
  //batch untuk jika mengirimkan ke firestore secara utuh jika gagal di tengah maka batal semua
  // const batch = firestore.batch();
  // objectToAdd.forEach(obj => {
  //   const newDocRef = collectionRef.doc();
  //   batch.set(newDocRef, obj);
  // });

  // return await batch.commit();
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
