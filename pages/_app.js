import React from "react"
import "../styles/globals.css"
import Head from "next/head"

// INTERNAL IMPORT
import { TrackingProvider } from "@/Context/Tracking"
import { Footer, NavBar } from "@/components"
export default function App({ Component, pageProps }) {
    return (
        <>
            <React.StrictMode>
                <TrackingProvider>
                    <Head>
                        <title>SecuriTrace</title>
                        <meta name="SecuriTrace" content="Supply Chain managemnet" />
                    </Head>
                    <NavBar />
                    <Component {...pageProps} />
                    <Footer />
                </TrackingProvider>
            </React.StrictMode>
        </>
    )
}
