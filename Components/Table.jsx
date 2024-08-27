import styles from "./Button.module.css"
import { useCallback } from "react"

export default ({ setCreateShipmentModel, allShipmentsdata }) => {
    const handleAddTrackingClick = useCallback(() => {
        setCreateShipmentModel(true)
    }, [setCreateShipmentModel])

    const convertTime = (time) => {
        if (!time) {
            console.warn("Invalid time provided for conversion")
            return "-"
        }

        const newTime = new Date(time)
        if (isNaN(newTime.getTime())) {
            console.warn("Invalid date object created")
            return "Invalid Date"
        }

        const dateTime = newTime.toLocaleString()

        return dateTime
    }

    // console.log("allShipmentsdata:", allShipmentsdata)
    // console.log("Raw pickupTime:", allShipmentsdata.pickupTime)
    // console.log("Raw deliveryTime:", allShipmentsdata.deliveryTime)
    // console.log("Formatted pickupTime:", convertTime(allShipmentsdata.pickupTime))

    return (
        <div className="max-w-screen-xl mx-auto py-10 px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Create Tracking</h3>
                    <p className="text-gray-600 mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam est
                        consequuntur eos deleniti ab voluptatem qui aspernatur perferendis.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <p onClick={handleAddTrackingClick} href="#" className={styles.styledButton}>
                        {" "}
                        Add Tracking
                    </p>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto pb-10 text-sm text-left bg-white">
                    <thead className="bg-gray-100 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Sender </th>
                            <th className="py-3 px-6">Receiver </th>
                            <th className="py-3 px-6">PickupTime </th>
                            <th className="py-3 px-6">Distance </th>
                            <th className="py-3 px-6">Price </th>
                            <th className="py-3 px-6">Delivery Time </th>
                            <th className="py-3 px-6">Paid </th>
                            <th className="py-3 px-6">Status </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {allShipmentsdata?.map((shipment, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {shipment.sender.slice(0, 15)}...
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {shipment.receiver.slice(0, 15)}...
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {convertTime(shipment.pickupTime)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {shipment.distance} Km
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {shipment.price} ETH
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {convertTime(shipment.deliveryTime + shipment.pickupTime       )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {shipment.isPaid ? "Completed" : "Not Completed"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {shipment.status === 0
                                        ? "PENDING"
                                        : shipment.status === 1
                                          ? "IN-TRANSIT"
                                            : shipment.status === 2
                                                ? "CANCELLED"
                                                : "DELIVERED"
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
