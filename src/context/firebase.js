
import {initializeApp}  from 'firebase/app';
import { getFirestore } from "@firebase/firestore";
import {getAuth} from 'firebase/auth';


const firebaseApp = initializeApp({
    apiKey: "AIzaSyBpchaVT9QJy-wOewabAjCC5cAaFLipXVY",
    authDomain: "react-chat-room-4d4e8.firebaseapp.com",
    projectId: "react-chat-room-4d4e8",
    storageBucket: "react-chat-room-4d4e8.appspot.com",
    messagingSenderId: "156700583838",
    appId: "1:156700583838:web:a2617f5939fc788f7e988f",
    measurementId: "G-L2CV72QM91"
  });

 export const db = getFirestore(firebaseApp);
 export const auth = getAuth(firebaseApp);




