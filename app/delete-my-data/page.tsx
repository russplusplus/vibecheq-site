"use client"

import "../../app/globals.css";
import 'react-phone-number-input/style.css'
import PhoneInput, { type Value } from 'react-phone-number-input'
import { useState, useEffect } from 'react'
import { Spinner } from "@nextui-org/spinner";
import ClipLoader from "react-spinners/ClipLoader"

import { getDatabase } from "firebase/database"

import { initializeApp } from "firebase/app";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
import { 
    getAuth, 
    onAuthStateChanged, 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    ConfirmationResult, 
    User, 
    deleteUser 
} from 'firebase/auth'

import dynamic from 'next/dynamic'

const log = console.log.bind(console)

const firebaseConfig = window.location.origin.includes("localhost") 
? {
    apiKey: "AIzaSyBS_IdUAjkyZaiiGosPPnr23mCn2MiItVk",
    authDomain: "vibecheq-dev-d930b.firebaseapp.com",
    databaseURL: "https://vibecheq-dev-d930b-default-rtdb.firebaseio.com",
    projectId: "vibecheq-dev-d930b",
    storageBucket: "vibecheq-dev-d930b.appspot.com",
    messagingSenderId: "958818368953",
    appId: "1:958818368953:web:a42c67cd34e1a81c268a68",
    measurementId: "G-QM9V6YHLE2"
}
: {
    apiKey: "AIzaSyDMDfZyu9ysYxKCfYOaDeBW75-ZkLrnQpI",
    authDomain: "vibecheq-prod.firebaseapp.com",
    databaseURL: "https://vibecheq-prod-default-rtdb.firebaseio.com",
    projectId: "vibecheq-prod",
    storageBucket: "vibecheq-prod.appspot.com",
    messagingSenderId: "670048616046",
    appId: "1:670048616046:web:473b754e7177448ce8707f",
    measurementId: "G-9H7DQB1GY8"
}
  
log('firebaseConfig:', firebaseConfig)

const app = initializeApp(firebaseConfig);
log('app initialized. app:', app)

const auth = getAuth()

onAuthStateChanged(auth, user => {
    if (user != null) {
        log('logged in!')
    } else {
        log('no user')
    }
})

export default function DeleteMyData(props: any) {

    const [phoneNumber, setPhoneNumber] = useState<Value>()
    const [otp, setOtp] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [confirmationResult, setConfirmationResult] = useState<null | ConfirmationResult>(null)
    const [user, setUser] = useState<null | User>(null)
    const [userDeleted, setUserDeleted] = useState(false)

    async function submit() {
        log('in submit. phone number:', phoneNumber)
        if (isLoading) {
            log('already loading')
            return
        }    
        setLoading(true)

        let verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              log('reCAPTCHA solved \m| response:', response)
            }
        });

        const result = await signInWithPhoneNumber(auth, String(phoneNumber), verifier)
            .catch((err) => {
                log('signInWithPhoneNumber error:', err)
                window.location.reload()
            })

        log('result:', result)
        if (result) setConfirmationResult(result)
        setLoading(false)
    }

    async function confirmCode() {
        if (isLoading) return

        setLoading(true)
        const result  = await confirmationResult?.confirm(otp)
            .catch((err) => {
                log('confirmCode error:', err)
            })
        
        if (result?.user) {
            setUser(result.user)
        } else {
            log('error. no user.')
        }
        setLoading(false)
    }

    async function deleteData() {
        if (isLoading) return
        if (!user) return
        setLoading(true)

        console.log('in deleteData. user:', user)

        await deleteUser(user)
            .catch((err) => {
                log('deleteUser error:', err)
            })

        setLoading(false)
        setUserDeleted(true)
    }

    useEffect(() => {
        log('phoneNumber:', phoneNumber)
    }, [phoneNumber])

    useEffect(() => {
        log('otp:', otp)
    }, [otp])

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen" >
            {userDeleted ?
            <>
                <div className="text-vwhite self-center">User data successfully deleted.</div>
            </>
            :
            <>
                {user ?
                <>
                    <div className="text-vwhite self-center">Delete data for user {user.phoneNumber}?</div>
                    <div className="bg-vwhite text-center mt-3 w-40 items-self-center hover:cursor-pointer select-none" onClick={deleteData}>
                        {isLoading 
                            ? <ClipLoader
                                size={14}
                                color={"#303841"}
                            />
                            : <>Delete</>
                        }
                    </div>
                </>
                :
                <>
                    {confirmationResult ?
                    <div className="flex flex-col items-center">
                        <label className="text-vwhite self-start">Passcode:</label>
                        <input onChange={(e) => setOtp(e.target.value)}></input>
                        <div onClick={confirmCode} className="bg-vwhite text-center mt-3 w-40 items-self-center hover:cursor-pointer select-none">
                            {isLoading 
                            ? <ClipLoader
                                size={14}
                                color={"#303841"}
                            />
                            : <>Submit</>
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center">
                        <label className="text-vwhite self-start" htmlFor="phoneInput">Phone number:</label>
                        <PhoneInput
                            className="bg-white"
                            id="phoneInput"
                            defaultCountry="US"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                        />
                        <div id="recaptcha-container"></div>
                        <div id="sign-in-button" className="bg-vwhite text-center mt-3 w-40 items-self-center hover:cursor-pointer select-none" onClick={submit}>
                            {isLoading 
                            ? <ClipLoader
                                size={14}
                                color={"#303841"}
                            />
                            : <>Send passcode</>
                            }
                        </div>
                    </div>
                    }
                </>
                }
            </>
            }
        </div>
    )
}