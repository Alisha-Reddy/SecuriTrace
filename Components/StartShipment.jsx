import { useState } from "react"
import { Str1 } from "../Components/index"
import styles from "./Button.module.css"

export default ({ startModel, setStartModel, startShipment }) => {
    const [getProduct, setGetProduct] = useState({
        receiver: "",
        index: "",
    })

    const startShipping = async () => {
        try {
            await startShipment(getProduct)
            setGetProduct({ receiver: "", index: "" })
            setStartModel(false)
            return true
        } catch (error) {
            console.log("Error starting shipment:", error)
            return false
        }
    }
    

    return startModel ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setStartModel(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div
                    className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"
                    style={{ background: "#ccdaf8" }}
                >
                    <div className="flex justify-end" style={{ background: "#ccdaf8" }}>
                        <button
                            className="p-2 text-gray-400 rounded-md hover:bg-stone-50 hover:rounded-full "
                            onClick={() => setStartModel(false)}
                        >
                            <Str1></Str1>
                        </button>
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">START YOUR SHIPPING</h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative mt-3">
                                <input
                                    type="text"
                                    placeholder="receiver"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border bg-white focus:border-black shadow-sm rounded-lg"
                                    onChange={(e) =>
                                        setGetProduct({
                                            ...getProduct,
                                            receiver: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="relative mt-3">
                                <input
                                    type="number"
                                    placeholder="Id"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border bg-white focus:border-black shadow-sm rounded-lg"
                                    onChange={(e) =>
                                        setGetProduct({
                                            ...getProduct,
                                            index: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                onClick={async () => {
                                    const success = await startShipping()
                                    if (success) {
                                        window.location.reload()
                                    }
                                }}
                                className={styles.styledButton}
                            >
                                {" "}
                                START SHIPMENT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
