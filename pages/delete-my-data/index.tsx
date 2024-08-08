import "../../app/globals.css";
import 'react-phone-number-input/style.css'
import PhoneInput, { type Value } from 'react-phone-number-input'
import { useState, useEffect } from 'react'
import { Spinner } from "@nextui-org/spinner";
import ClipLoader from "react-spinners/ClipLoader"

import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const log = console.log.bind(console)

const firebaseConfig = {

}

const app = initializeApp

export default function DeleteMyData() {

    const [phoneNumber, setPhoneNumber] = useState<Value | undefined>()
    const [isLoading, setLoading] = useState(false)

    function submit() {
        log('in submit')
        setLoading(true)
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