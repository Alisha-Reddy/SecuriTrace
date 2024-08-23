import { useState } from "react"
import { Str1 } from "../Components/index"
import styles from "./Button.module.css"

export default ({ getModel, setGetModel, getShipment }) => {
    const [index, setIndex] = useState("")
    const [singleShipmentData, setSingleShipmentData] = useState()
    const [loading, setLoading] = useState(false)


    const getShipmentData = async () => {
        setLoading(true)
        try {
            const getData = await getShipment(index)
            console.log("Fetched Shipment Data:", getData) 
            setSingleShipmentData(getData)
        } catch (error) {
            console.error("Error fetching shipment data:", error)
        } finally {
            setLoading(false)
        }
    }


    console.log("Single shipment data: ", singleShipmentData)

    const convertTime = (time) => {
        if (!time) {
            return "Invalid Date"
        }
        const newTime = new Date(time)
        if (isNaN(newTime.getTime())) {
            return "Invalid Date"
        }
        const dataTime = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(newTime)
        return dataTime
    }

    

    return getModel ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setGetModel(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div
                    className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"
                    style={{ background: "#ccdaf8" }}
                >
                    <div className="flex justify-end">
                        <button
                            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                            onClick={()=> setGetModel(false)}
                        >
                            <Str1></Str1>
                        </button>
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">
                            PRODUCT TRACKING DETAILS
                        </h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative mt-3">
                                <input
                                    type="number"
                                    placeholder="ID"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border bg-white focus:border-black shadow-sm rounded-lg"
                                    onChange={(e) => setIndex(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => getShipmentData()}
                                className={styles.styledButton}
                            >
                                {loading ? "Loading..." : "GET DETAILS"}
                            </button>
                        </form>
                        {singleShipmentData == undefined ? (
                            ""
                        ) : (
                            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Sender:</span>{" "}
                                    {singleShipmentData.sender.slice(0, 6)}......
                                    {singleShipmentData.sender.slice(
                                        singleShipmentData.sender.length - 6,
                                    )}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Receiver:</span>{" "}
                                    {singleShipmentData.receiver.slice(0, 6)}......
                                    {singleShipmentData.receiver.slice(
                                        singleShipmentData.receiver.length - 6,
                                    )}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Pickup Time:</span>{" "}
                                    {convertTime(singleShipmentData.pickupTime)}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Delivery Time:</span>{" "}
                                    {convertTime(singleShipmentData.deliveryTime)}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Distance:</span>{" "}
                                    {singleShipmentData.distance} km
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Price:</span> $
                                    {singleShipmentData.price}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Status:</span>{" "}
                                    {singleShipmentData.status}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <span className="font-semibold">Paid:</span>{" "}
                                    {singleShipmentData.isPaid ? "Completed" : "Not Completed"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
