import React from "react"
import "@/styles/globals.css"
import Head from "next/head"
import { http, createConfig } from "wagmi"
import { localhost, mainnet, sepolia } from "wagmi/chains"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


// INTERNAL IMPORT
import { TrackingProvider } from "@/Context/Tracking"
import { Footer, NavBar } from "@/components/index.js"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {

    const config = createConfig({
        chains: [mainnet, sepolia, localhost],
        transports: {
            [mainnet.id]: http(
                "https://eth-mainnet.g.alchemy.com/v2/FJ2bntQOlBZ-CxnqVSPaD-RlU_h7VQ-d",
            ),
            [sepolia.id]: http(
                "https://eth-sepolia.g.alchemy.com/v2/FJ2bntQOlBZ-CxnqVSPaD-RlU_h7VQ-d",
            ),
            [localhost.id]: http("http://127.0.0.1:8545/"),
        },
    })

    return (
        <>
            <React.StrictMode>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <TrackingProvider>
                            <Head>
                                <title>SecuriTrace</title>
                                <meta name="SecuriTrace" content="Supply Chain managemnet" />
                            </Head>
                            <NavBar />
                            <Component {...pageProps} />
                            <Footer />
                        </TrackingProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </React.StrictMode>
        </>
    )
}
