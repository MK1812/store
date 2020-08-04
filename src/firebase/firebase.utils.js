import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyAEXcQDZmKB-j_47dJtK_vNExkGJaddwZI",
    authDomain: "store-db-472a9.firebaseapp.com",
    databaseURL: "https://store-db-472a9.firebaseio.com",
    projectId: "store-db-472a9",
    storageBucket: "store-db-472a9.appspot.com",
    messagingSenderId: "637102200863",
    appId: "1:637102200863:web:8f1cf2e59e0053ab461d2a",
    measurementId: "G-J71VW617RN"
};

export const createUserProfileDocument=async(userAuth,additionalData)=>{
    if(!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();

    if(!snapShot.exists){
        const {displayName,email}=userAuth;
        const createdAt=new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log(error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle=()=>auth.signInWithPopup(provider);
export default firebase;