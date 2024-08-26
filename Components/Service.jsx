import images from "../Images/index"
import Image from "next/image"

export default ({
    setOpenProfile,
    setCompleteModel,
    setGetModel,
    setStartModel,
    setCancelModel,
}) => {
    const team = [
        { avatar: images.userProfile },
        { avatar: images.startShipment },
        { avatar: images.getShipment },
        { avatar: images.compShipment },
        { avatar: images.cancelshipment },
        { avatar: images.send },
    ]

    const openModalBox = (text) => {
        if (text === 1) {
            setOpenProfile(true)
        } else if (text === 2) {
            setStartModel(true)
        } else if (text === 3) {
            setGetModel(true)
        } else if (text === 4) {
            setCompleteModel(true)
        } else if (text === 5) {
            setCancelModel(true)
        }
    }

    return (
        <section className="py-0 pb-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {team.map((item, i) => (
                            <li key={i}>
                                <div
                                    onClick={() => openModalBox(i + 1)}
                                    className="w-full h-60 sm:h-52 md:h-56"
                                >
                                    <Image
                                        src={item.avatar}
                                        className="w-full h-full object-cover object-center shadow-md rounded-xl "
                                        style={{ cursor: "pointer" }}
                                        alt=""
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
