"use client"

import React, { createContext, useEffect, useState, useContext } from 'react'
import { getAuth, onAuthStateChanged, User, Auth } from 'firebase/auth'
// import { app } from '../app/firebase'

import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

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

console.log('firebaseConfig:', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)

const initialUser: any = null

const AuthContext = createContext({
  auth: firebaseAuth,
  user: initialUser,
  loading: true,
})

export function AuthContextProvider({
    children
}: { 
    children: React.ReactNode 
}) {
  const [auth, setAuth] = useState<Auth>(firebaseAuth)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unSubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ auth, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be used within AuthContextProvider')
    }
    return context
}