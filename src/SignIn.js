import React from 'react'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();

const SignIn = () => {
    const signInWithGoogle = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential);
        })
        
    }
    return (
        <button onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}

function SignOut(){
    return auth.currentUser && (
         <button onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export {SignIn, SignOut}
