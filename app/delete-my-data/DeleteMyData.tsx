"use client"

import "../../app/globals.css";
import 'react-phone-number-input/style.css'
import PhoneInput, { type Value } from 'react-phone-number-input'
import { useState, useEffect } from 'react'
import { Spinner } from "@nextui-org/spinner";
import ClipLoader from "react-spinners/ClipLoader"

// import { auth } from "../../firebase"
// import firebase from 'firebase/app';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getDatabase } from "firebase/database"
// import { useAuthContext } from "./AuthContext"

const log = console.log.bind(console)

// const auth = getAuth(app)



export default function DeleteMyData({
    authStr
} : {
    authStr: string
}) {
    const [phoneNumber, setPhoneNumber] = useState<Value | null>(null)
    const [isLoading, setLoading] = useState(false)

    const [auth, setAuth] = useState(null)
    // const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier | null>(null)

    // const { auth, user, loading } = useAuthContext()

    

    // async function onSignInSubmit(phoneNumber: string, auth, appVerifier) {
        
    // }

    async function submit() {
        log('in submit')
        setLoading(true)
        // log('auth:', auth)
        const appVerifier = window.recaptchaVerifier
        log('appVerifier:', appVerifier)
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier).catch((err) => {
            log('err:', err)
            return
        })

        log('confirmationResult:', confirmationResult)
        
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
    }

    async function setUpRecaptcha() {
        log('in setUpRecaptcha')
        const auth = authStr ? await JSON.parse(authStr) : null
        // log('auth:', auth)
        if (!auth) return
        log('auth is not null')
        setAuth(auth)
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response: any) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              log('reCAPTCHA solved \m| response:', response)
            //   onSignInSubmit(String(phoneNumber));
            }
        });
        // setAppVerifier(verifier)
    }

    useEffect(() => {
        log('phoneNumber:', phoneNumber)
    }, [phoneNumber])

    useEffect(() => {
        setUpRecaptcha()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen" >
            <div className="flex flex-col items-center">
                <label className="text-vwhite self-start" htmlFor="phoneInput">Phone number:</label>
                <PhoneInput
                    className="bg-white"
                    id="phoneInput"
                    defaultCountry="US"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                />
                <div className="bg-vwhite text-center mt-3 w-40 items-self-center hover:cursor-pointer select-none" onClick={submit}>
                    {isLoading 
                    ? <ClipLoader
                        size={14}
                        color={"#303841"}
                    />
                    : <>Send passcode</>
                    }
                </div>
            </div>
        </div>
    )
}