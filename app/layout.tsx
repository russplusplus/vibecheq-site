import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext"

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
    <AuthContextProvider>
      <html lang="en">
        <body>
          {/* <AuthProvider> */}
            {children}
          {/* </AuthProvider> */}
        </body>
      </html>
    </AuthContextProvider>
  );
}
