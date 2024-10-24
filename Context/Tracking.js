import React, { useEffect, useState } from "react"
// import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { useAccount } from "wagmi"
// import { abi } from "../constants"
import contractAddresses from "../constants/contractAddresses.json"
import abi from "../constants/abi.json"
import { connect } from "@wagmi/core"

export const TrackingContext = React.createContext()

export const TrackingProvider = ({ children }) => {
    const { isConnected, address } = useAccount()
    const account = useAccount()
    const chainId = account.chainId
    console.log(chainId)

    const [contractAddress, setContractAddress] = useState(null)
    const [contract, setContract] = useState(null)

    // STATE VARIABLE
    const DappName = "Product Tracking Dapp"

    // Set contract address based on chainId
    useEffect(() => {
        try {
            console.log("Fetching contact address")
            console.log("Contract Addresses:", contractAddresses)
            if (chainId) {
                console.log("chainId:", chainId)
                const trackingAddress =
                    chainId in contractAddresses ? contractAddresses[chainId.toString()][0] : null
                // const trackingAddress = 0x5fbdb2315678afecb367f032d93f642f64180aa3
                if (trackingAddress) {
                    setContractAddress(trackingAddress)
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
        if (typeof window !== "undefined" && window.ethereum && contractAddress) {
            console.log("Using contrctAddress:", contractAddress)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const trackingContract = new ethers.Contract(contractAddress, abi, signer)

            setContract(trackingContract)
        }
    }, [contractAddress])

    const createShipment = async (items) => {
        console.log("items:", items)
        const { receiver, pickupTime, distance, price } = items
        try {
            console.log("Creating shipment")
            if (!contract) {
                console.error("Contract is not initialized")
                return
            }
            console.log("Converted pickupTime:", new Date(pickupTime).getTime())

            console.log("ethers.utils.parseEther(price)", ethers.utils.parseEther(price))
            const transaction = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseEther(price),
                {
                    value: ethers.utils.parseEther(price),
                    gasLimit: 300000,
                },
            )
            console.log("1")
            await transaction.wait()
            console.log("Shipment created successfully", transaction)
        } catch (error) {
            console.log("Error creating shipment:", error)
        }
    }

    const getAllShipment = async () => {
        try {
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
                currentUser: address,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipment,
                startShipment,
                getShipmentsCount,
                cancelShipment,
                DappName,
                connect,
                isConnected,
            }}
        >
            {children}
        </TrackingContext.Provider>
    )
}
