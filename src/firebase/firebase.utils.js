import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA1eho1ZgF-zwO09gR5Ipy5L6KpPKn3oKU",
    authDomain: "d20rpg-142cc.firebaseapp.com",
    databaseURL: "https://d20rpg-142cc.firebaseio.com",
    projectId: "d20rpg-142cc",
    storageBucket: "d20rpg-142cc.appspot.com",
    messagingSenderId: "179023374302",
    appId: "1:179023374302:web:ebf7300209d11e680a9f4f",
    measurementId: "G-THE592K54Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //it is an async request so you must await its return
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    //you have to use documentref object to interact with database
    const{displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
      console.log('error createing user', error.message);

    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
