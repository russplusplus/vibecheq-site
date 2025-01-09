import type { Metadata } from "next";
import "./globals.css";

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
    // <RootLayoutWrapper>
      <html lang="en">
        <body>
          {/* <AuthProvider> */}
            {children}
          {/* </AuthProvider> */}
        </body>
      </html>
    // </RootLayoutWrapper>
    // </AuthContextProvider>
  );
}
