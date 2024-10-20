import React, { useEffect, useState, useRef } from "react"
// import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { useAccount } from "wagmi"
import {abi, contractAddress} from "../constants"
import { connect } from "@wagmi/core"

export const TrackingContext = React.createContext()

export const TrackingProvider = ({ children }) => {
    const { isConnected, address } = useAccount()
    const account = useAccount()
    const chainId = account.chainId

    const [contractAddresses, setContractAddresses] = useState(null)
    const [contract, setContract] = useState(null)

    // STATE VARIABLE
    const DappName = "Product Tracking Dapp"

    // Set contract address based on chainId
    useEffect(() => {
        try {
            if (chainId && contractAddress) {
                console.log("chainId:", chainId)
                const trackingAddress =
                    chainId in contractAddress ? contractAddress[chainId][0] : null
                if (trackingAddress) {
                    setContractAddresses(trackingAddress)
                    console.log("Contract address:", trackingAddress)
                }
            } else {
                console.error("contractAddress is undefined or chainId is not available")
            }
        } catch (error) {
            console.error("Error accessing contract address:", error)
        }

    }, [chainId])

    // INITIALIZE CONTRACT INSTANCE
    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum && contractAddresses) {
            console.log("Using contrctAddress:", contractAddresses)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const trackingContract = new ethers.Contract(contractAddresses, abi, signer)

            setContract(trackingContract)
        }
    }, [contractAddresses])

    const createShipment = async (items) => {
        console.log(items)
        const { receiver, pickupTime, distance, price } = items

        try {
            const transaction = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                },
            )
            await transaction.wait()
            console.log("Shipment created successfully", transaction)
        } catch (error) {
            console.log("Error creating shipment:", error)
        }
    }

    const getAllShipment = async () => {
        try {
            // console.log("Fetching all shipments...")
            // const contract = await connectToContract()
            // console.log("contract:", contract)

            const shipments = await contract.getAllTransactions()
            console.log("Shipments from contract:", shipments)

            if (!shipments || shipments.length === 0) {
                console.log("No shipments found or empty response.")
                return []
            }

            return shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }))
        } catch (error) {
            console.log("Error fetching shipments:", error)
            return []
        }
    }

    const getShipmentsCount = async () => {
        try {
            // const accounts = await window.ethereum.request({
            //     method: "eth_requestAccounts",
            // })

            // console.log("Account: ", address)

            // const contract = await connectToContract()

            const shipmentsCount = await contract.getShipmentCount(address)
            console.log("Shipments count:", shipmentsCount)
            return shipmentsCount.toNumber()
        } catch (error) {
            console.log("Error fetching shipment count:", error)
        }
    }

    const completeShipment = async ({ receiver, index }) => {
        try {
            // console.log("sender:", address)
            // console.log("receiver:", receiver)
            // console.log("index", index)

            const transaction = await contract.completeShipment(address, receiver, index - 1, {
                gasLimit: 300000,
            })

            await transaction.wait()
            console.log("Shipment completed:", transaction)
        } catch (error) {
            console.log("Error completing shipment:", error)
        }
    }

    const cancelShipment = async ({ receiver, index }) => {
        try {
            const transaction = await contract.cancelShipment(address, receiver, index - 1, {
                gasLimit: 300000,
            })
            await transaction.wait()

            console.log("Shipment cancelled successfully!")
        } catch (error) {
            console.log("Error cancelling shipment: ", error)
        }
    }

    const getShipment = async (index) => {
        try {
            console.log(`Fetching shipment with index: ${index}`)
            const shipment = await contract.getShipment(address, index - 1)
            console.log("Raw single shipment data:", shipment)
            return {
                sender: shipment.sender,
                receiver: shipment.receiver,
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                price: ethers.utils.formatEther(shipment.price.toString()),
                status: shipment.status,
                isPaid: shipment.isPaid,
            }
        } catch (error) {
            console.error("Error fetching shipment:", error)
        }
    }

    const startShipment = async ({ receiver, index }) => {

        try {
            const shipment = await contract.startShipment(address, receiver, index - 1)

            shipment.wait()
            console.log(shipment)
        } catch (error) {
            console.log("Sorry no shipment", error)
        }
    }


    return (
        <TrackingContext.Provider
            value={{
                connect,
                createShipment,
                getAllShipment,
                getShipment,
                getShipmentsCount,
                startShipment,
                cancelShipment,
                completeShipment,
                DappName,
                currentUser: address,
                isConnected,
            }}
        >
            {children}
        </TrackingContext.Provider>
    )
}
