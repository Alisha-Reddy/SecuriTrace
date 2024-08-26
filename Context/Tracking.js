import React, { useEffect, useState, useRef } from "react"
import Web3Modal from "web3modal"
import { ethers } from "ethers"

// INTERNAL IMPORTS
import tracking from "../Context/Tracking.json"
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const ContractABI = tracking.abi

// console.log(ContractABI)

// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider)

export const TrackingContext = React.createContext()

export const TrackingProvider = ({ children }) => {
    // STATE VARIABLE
    const DappName = "Product Tracking Dapp"
    const [currentUser, setCurrentUser] = useState("")
    const web3ModalRef = useRef(null)

    // Initializing Web3ModalRef
    const initializedWeb3ModalRef = () => {
        if (!web3ModalRef.current) {
            console.log("Initializing Web3Modal...")
            web3ModalRef.current = new Web3Modal({
                cacheProvider: true, // Enables caching for reconnection
            })
        }
    }

    const connectToContract = async () => {
        try {
            initializedWeb3ModalRef()
            if (!web3ModalRef.current) {
                throw new Error("Web3Modal is not initialized.")
            }
            const connection = await web3ModalRef.current.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            return fetchContract(signer)
        } catch (error) {
            console.error("Error in connectToContract:", error)
            return null
        }
    }

    // console.log("web3ModalRef.current:", web3ModalRef.current)

    const createShipment = async (items) => {
        console.log(items)
        const { receiver, pickupTime, distance, price } = items

        try {
            // const connection = await web3ModalRef.current.connect()
            // const provider = new ethers.providers.Web3Provider(connection)
            // const signer = provider.getSigner()
            // const contract = fetchContract(signer)
            const contract = await connectToContract()
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                },
            )
            await createItem.wait()
            console.log("Item got created")
            console.log(createItem)
        } catch (error) {
            console.log("Something went wrong!", error)
        }
    }

    const getAllShipment = async () => {
        try {
            console.log("Fetching all shipments...")
            const contract = await connectToContract()
            const shipments = await contract.getAllTransactions()
            console.log("Shipments from contract:", shipments)

            if (!shipments || shipments.length === 0) {
                console.log("No shipments found or empty response.")
                return []
            }

            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }))

            return allShipments
        } catch (error) {
            console.log("Something went wrong", error)
            return []
        }
    }

    const getShipmentsCount = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask"
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            console.log("Account: ", accounts[0])

            // const provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/ErVq1VJ9pedwYuXG8L_WGfru6tpp-VxV`);
            // const contract = fetchContract(provider);

            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            // const signer = provider.getSigner()
            // const contract = new ethers.Contract(ContractAddress, ContractABI, signer)

            const contract = await connectToContract()

            // console.log("Contract address:", ContractAddress)
            // console.log("Account:", accounts[0])

            const shipmentsCount = await contract.getShipmentCount(accounts[0])
            console.log("Shipments count:", shipmentsCount)
            return shipmentsCount.toNumber()
        } catch (error) {
            console.log("Could not fetch shipment count:", error)
        }
    }

    const completeShipment = async (completeShip) => {
        console.log(completeShip)

        const { receiver, index } = completeShip
        try {
            if (!window.ethereum) return "Install Metamask"

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            const contract = await connectToContract()

            console.log("sender:", accounts[0])
            console.log("receiver:", receiver)
            console.log("index", index)

            const transaction = await contract.completeShipment(accounts[0], receiver, index, {
                gasLimit: 300000,
            })

            transaction.wait()
            console.log(transaction)
        } catch (error) {
            console.log("wrong completeshipment", error)
        }
    }

    const cancelShipment = async (cancelShip) => {
        console.log("cancelShip:", cancelShip)

        const { receiver, index } = cancelShip
        try {
            if (!window.ethereum) return "Install metamask"

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            const contract = await connectToContract()

            const transaction = await contract.cancelShipment(accounts[0], receiver, index, {
                gasLimit: 300000,
            })
            await transaction.wait()

            alert("Shipment cancelled successfully!")
        } catch (error) {
            console.log("Error cancelling shipment: ", error)
        }
    }

    const getShipment = async (index) => {
        console.log(`Attempting to fetch shipment with index: ${index}`)
        try {
            if (!window.ethereum) return "Install Metamask"

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            // const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/ErVq1VJ9pedwYuXG8L_WGfru6tpp-VxV`);
            // const contract = fetchContract(provider);

            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            // const signer = provider.getSigner()
            // const contract = new ethers.Contract(ContractAddress, ContractABI, signer)

            const contract = await connectToContract()

            // const shipment = await contract.getShipment(accounts[0], index * 1)

            console.log(`Fetching shipment with index: ${index}`)
            const shipment = await contract.getShipment(accounts[index], index)
            console.log("Raw single shipment data:", shipment)

            // const SingleShipment = {
            //     sender: shipment.sender,
            //     receiver: shipment.receiver,
            //     pickupTime: shipment.pickupTime.toNumber(),
            //     deliveryTime: shipment.deliveryTime.toNumber(),
            //     distance: shipment.distance.toNumber(),
            //     price: ethers.utils.formatEther(shipment.price.toString()),
            //     status: shipment.status,
            //     isPaid: shipment.isPaid,
            // }
            const SingleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7],
            }

            console.log("Processed single shipment data:", SingleShipment)
            return SingleShipment
        } catch (error) {
            console.log("Sorry no shipment", error)
        }
    }

    const startShipment = async (getProduct) => {
        const { receiver, index } = getProduct

        try {
            if (!window.ethereum) return "Install Metamask"

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            const contract = await connectToContract()
            const shipment = await contract.startShipment(accounts[0], receiver, index * 1)

            shipment.wait()
            console.log(shipment)
        } catch (error) {
            console.log("Sorry no shipment", error)
        }
    }

    // CHECK WALLET CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            initializedWeb3ModalRef()
            if (web3ModalRef.current.cachedProvider) {
                const connection = await web3ModalRef.current.connect()
                const provider = new ethers.providers.Web3Provider(connection)
                const accounts = await provider.listAccounts()

                if (accounts.length) {
                    setCurrentUser(accounts[0])
                } else {
                    console.log("No account found")
                }
            } else {
                console.log("No cached provider found")
            }
        } catch (error) {
            console.log("Wallet connection error:", error)
        }
    }

    // CONNECT THE WALLET
    const connectWallet = async () => {
        try {
            const connection = await web3ModalRef.current.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const accounts = await provider.listAccounts()
            setCurrentUser(accounts[0])
        } catch (error) {
            console.log("Something went wrong:", error)
        }
    }
    // const connectWallet = async () => {
    //     try {
    //         if (!window.ethereum) return "Install Metamask"

    //         const accounts = await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //         })
    //         setCurrentUser(accounts[0])
    //     } catch (error) {
    //         return "Something went wrong"
    //     }
    // }

    useEffect(() => {
        initializedWeb3ModalRef()
        checkIfWalletConnected()
    }, [])

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                getShipment,
                getShipmentsCount,
                startShipment,
                cancelShipment,
                completeShipment,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    )
}
