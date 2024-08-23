import { useState } from "react"
import { Str1 } from "../Components/index"
import styles from "./Button.module.css"

export default ({ completeModel, setCompleteModel, completeShipment }) => {
    const [completeShip, setCompleteShip] = useState({
        receiver: "",
        index: "",
    })

    const changeStatus = async () => {
        try {
            await completeShipment(completeShip)
            setCompleteShip({ receiver: "", index: "" })
            setCompleteModel(false)
            return true
        } catch (error) {
            console.log("Error completing shipment", error)
            return false
        }
    }

    

    return completeModel ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setCompleteModel(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div
                    className="relative w-full max-w-lg p-4 mx-auto  rounded-md shadow-lg"
                    style={{ background: "#ccdaf8" }}
                >
                    <div className="flex justify-end">
                        <button
                            className="p-2 text-gray-400 rounded-md hover:bg-stone-50 hover:rounded-full "
                            onClick={()=>setCompleteModel(false)}
                        >
                            <Str1 />
                        </button>
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">COMPLETE SHIPMENT</h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative mt-3">
                                <input
                                    type="text"
                                    placeholder="Receiver"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border bg-white focus:border-black shadow-sm rounded-lg"
                                    onChange={(e) =>
                                        setCompleteShip({
                                            ...completeShip,
                                            receiver: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="relative mt-3">
                                <input
                                    type="number"
                                    placeholder="ID"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border bg-white focus:border-black shadow-sm rounded-lg"
                                    onChange={(e) =>
                                        setCompleteShip({
                                            ...completeShip,
                                            index: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                onClick={async () => {
                                    const success = await changeStatus()
                                    if (success) {
                                        window.location.reload()
                                    }
                                }}
                                className={styles.styledButton}
                                // className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-blue-950 hover:bg- active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600focus:ring-2"
                                // style={{ background: "#000014" } }
                            >
                                {" "}
                                Change Status
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
