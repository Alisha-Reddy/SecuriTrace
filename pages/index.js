import { useContext, useEffect, useState } from "react"

// INTERNAL IMPORT
import {
    Table,
    Form,
    Service,
    Profile,
    CompleteShipment,
    GetShipment,
    StartShipment,
    CancelShipment,
} from "../components/index"
import { TrackingContext } from "@/Context/Tracking"

const index = () => {
    const {
        currentUser,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        cancelShipment,
    } = useContext(TrackingContext)

    // STATE VARIABLE
    const [createShipmentModel, setCreateShipmentModel] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [startModel, setStartModel] = useState(false)
    const [completeModel, setCompleteModel] = useState(false)
    const [getModel, setGetModel] = useState(false)
    const [cancelModel, setCancelModel] = useState(false)

    // DATA STATE VARIABLE
    const [allShipmentsdata, setAllShipmentsdata] = useState([])

    useEffect(() => {
        const fetchShipmentsData = async () => {
            try {
                const shipments = await getAllShipment()
                console.log("shipments:", shipments)
                setAllShipmentsdata(shipments)
            } catch (error) {
                console.log("Error fetching shipments data:", error)
            }
        }

        fetchShipmentsData()

        // const getCampaignsData = getAllShipment()
        // console.log("Get Campaigns data: ", getCampaignsData)

        // return async () => {
        //     const allData = await getCampaignsData
        //     console.log("all data:", allData)
        //     setAllShipmentsdata(allData)
        // }
    }, [getAllShipment])

    return (
        <>
            <Service
                setOpenProfile={setOpenProfile}
                setCompleteModel={setCompleteModel}
                setGetModel={setGetModel}
                setStartModel={setStartModel}
                setCancelModel={setCancelModel}
            />
            <Table
                setCreateShipmentModel={setCreateShipmentModel}
                allShipmentsdata={allShipmentsdata}
            />
            <Form
                createShipmentModel={createShipmentModel}
                createShipment={createShipment}
                setCreateShipmentModel={setCreateShipmentModel}
            />
            <Profile
                openProfile={openProfile}
                setOpenProfile={setOpenProfile}
                currentUser={currentUser}
                getShipmentsCount={getShipmentsCount}
            />
            <CompleteShipment
                completeModel={completeModel}
                setCompleteModel={setCompleteModel}
                completeShipment={completeShipment}
            />
            <GetShipment getModel={getModel} setGetModel={setGetModel} getShipment={getShipment} />
            <StartShipment
                startModel={startModel}
                setStartModel={setStartModel}
                startShipment={startShipment}
            />
            <CancelShipment
                cancelModel={cancelModel}
                setCancelModel={setCancelModel}
                cancelShipment={cancelShipment}
            />
        </>
    )
}

export default index
