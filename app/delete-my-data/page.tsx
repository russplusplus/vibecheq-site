"use client"

import "../../app/globals.css";
import 'react-phone-number-input/style.css'
import PhoneInput, { type Value } from 'react-phone-number-input'
import { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    ConfirmationResult, 
    User, 
    deleteUser,
    Auth
} from 'firebase/auth'

const log = console.log.bind(console)

export default function DeleteMyData(props: any) {

    const [auth, setAuth] = useState<null | Auth>(null)
    const [phoneNumber, setPhoneNumber] = useState<Value>()
    const [otp, setOtp] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [confirmationResult, setConfirmationResult] = useState<null | ConfirmationResult>(null)
    const [user, setUser] = useState<null | User>(null)
    const [userDeleted, setUserDeleted] = useState(false)

    function init() {
        const config = window.location.origin.includes('localhost')
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
        // setFirebaseConfig(config)
        const app = initializeApp(config)
        // setApp(initializeApp(config))
        const auth = getAuth(app)
        setAuth(auth)

        onAuthStateChanged(auth!, user => {
            if (user != null) {
                log('logged in!')
            } else {
                log('no user')
            }
        })
    

    }

    async function submit() {
        log('in submit. phone number:', phoneNumber)
        if (isLoading) {
            log('already loading')
            return
        }    
        setLoading(true)

        let verifier = new RecaptchaVerifier(auth!, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              log('reCAPTCHA solved \m| response:', response)
            }
        });

        const result = await signInWithPhoneNumber(auth!, String(phoneNumber), verifier)
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
        init()
    }, [])

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