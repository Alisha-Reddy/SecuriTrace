import { useContext, useEffect, useState } from "react";

// INTERNAL IMPORT
import {
  Table,
  Form,
  Service,
  Profile,
  CompleteShipment,
  GetShipment,
  StratShipment,
  StartShipment,
} from "../Components/index";
import { TrackingContext } from "@/Context/Tracking";

const index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipmnet,
    stratShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  // STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false)
  const [startModel, setStartModel] = useState(false)
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);

  // DATA STATE VARIABLE
  const [allShipmentsdata, setAllShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setAllShipmentsdata(allData);
    }
  }, []);

  return (
    <>
      <Service
        setOpenProfile={setOpenProfile}
        setCompleteModel={setCompleteModel}
        setGetModel={setGetModel}
        setStartModel={setStartModel}
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
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipmnet={getShipmnet}
      />
      <StartShipment
        startModel={startModel}
        setStartModel={setStartModel}
        StartShipment={StartShipment}
      />
    </>
  )

}

export default index;