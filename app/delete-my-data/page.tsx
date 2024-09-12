// import "../../app/globals.css";
// import 'react-phone-number-input/style.css'
// import PhoneInput, { type Value } from 'react-phone-number-input'
// import { useState, useEffect } from 'react'
// import { Spinner } from "@nextui-org/spinner";
// import ClipLoader from "react-spinners/ClipLoader"

// import { auth } from "../../firebase"
// import firebase from 'firebase/app';
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { getDatabase } from "firebase/database"
// import AuthContextProvider from "./AuthContext"
import DeleteMyData from "./DeleteMyData"

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User, Auth } from 'firebase/auth'

const log = console.log.bind(console)

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
log('firebaseConfig:', firebaseConfig)

const app = initializeApp(firebaseConfig);
log('app initialized')

const auth = getAuth()
log('auth:', auth)

export default function DeleteMyDataContainer(props: any) {

    // const [phoneNumber, setPhoneNumber] = useState<Value>()
    // const [isLoading, setLoading] = useState(false)

    // const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier | null>(null)


    

    // async function onSignInSubmit(phoneNumber: string) {
    //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier).catch((err) => {
    //         log('err:', err)
    //         return
    //     })

    //     log('confirmationResult:', confirmationResult)
        
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    // }

    // async function submit() {
    //     log('in submit')
    //     setLoading(true)
    //     // onSignInSubmit(String(phoneNumber))
    // }

    // function setUpRecaptcha() {
    //     log('auth:', auth)
    //     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    //         'size': 'invisible',
    //         'callback': (response: any) => {
    //           // reCAPTCHA solved, allow signInWithPhoneNumber.
    //           log('reCAPTCHA solved \m| response:', response)
    //         //   onSignInSubmit(String(phoneNumber));
    //         }
    //     });
    //     // setAppVerifier(verifier)
    // }

    // useEffect(() => {
    //     log('phoneNumber:', phoneNumber)
    // }, [phoneNumber])

    // useEffect(() => {
    //     setUpRecaptcha()
    // }, [])

    return (
        // <AuthContextProvider auth={JSON.stringify(auth)}>
            <DeleteMyData authStr={JSON.stringify(auth)}/>
        // </AuthContextProvider>
    )
}