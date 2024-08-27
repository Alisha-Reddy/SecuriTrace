import React from "react"
import "@/styles/globals.css"
import Head from "next/head"


// INTERNAL IMPORT
import { TrackingProvider } from "@/Context/Tracking"
import { Footer, NavBar } from "@/Components"
export default function App({ Component, pageProps }) {
    return (
        <>
            <React.StrictMode>
                <TrackingProvider>
                    <Head>
                        <title>Product Tracking Dapp</title>
                        <meta name="Product Tracking" content="Supply Chain managemnet" />
                    </Head>
                        <NavBar />
                        <Component {...pageProps} />
                        <Footer />
                </TrackingProvider>
            </React.StrictMode>
        </>
    )
}
