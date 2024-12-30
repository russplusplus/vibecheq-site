import type { Metadata } from "next";
import "./globals.css";
// import { AuthContextProvider } from "../pages/delete-my-data/AuthContext"
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, User, Auth } from 'firebase/auth'

const log = console.log.bind(console)

export const metadata: Metadata = {
  title: "Vibecheq",
  description: "Vibecheq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AuthContextProvider app={app} auth={auth}>
      <html lang="en">
        <body>
          {/* <AuthProvider> */}
            {children}
          {/* </AuthProvider> */}
        </body>
      </html>
    // </AuthContextProvider>
  );
}
