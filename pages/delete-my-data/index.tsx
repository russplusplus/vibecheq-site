"use client"

import "../../app/globals.css";
import 'react-phone-number-input/style.css'
import PhoneInput, { type Value } from 'react-phone-number-input'
import { useState, useEffect } from 'react'
import { Spinner } from "@nextui-org/spinner";
import ClipLoader from "react-spinners/ClipLoader"

// import { auth } from "../../firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getDatabase } from "firebase/database"
import { useAuthContext } from "../../context/AuthContext"

const log = console.log.bind(console)

// const auth = getAuth(app)



export default function DeleteMyData(props: any) {

    log('in DeleteMyData. props:', props)

    const [phoneNumber, setPhoneNumber] = useState<Value>()
    const [isLoading, setLoading] = useState(false)

    const { user, loading } = useAuthContext()

    // const appVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    //     'size': 'invisible',
    //     'callback': (response: any) => {
    //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //       log('reCAPTCHA solved \m| response:', response)
    //       onSignInSubmit(String(phoneNumber));
    //     }
    // });

    // const appVerifier = recaptchaVerifier;

    async function onSignInSubmit(phoneNumber: string) {
        // const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier).catch((err) => {
        //     log('err:', err)
        //     return
        // })

        // log('confirmationResult:', confirmationResult)
        
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
    }

    async function submit() {
        log('in submit')
        setLoading(true)
        onSignInSubmit(String(phoneNumber))
        
    }

    useEffect(() => {
        log('phoneNumber:', phoneNumber)
    }, [phoneNumber])

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