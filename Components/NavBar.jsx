import { useState, useContext } from "react"
import { TrackingContext } from "@/Context/Tracking"
import { Nav1, Nav2, Nav3 } from "./index"
import Image from "next/image"
import images from "../Images/index"

export default () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { currentUser, connectWallet } = useContext(TrackingContext)

    const navigation = [
        { title: "Home", path: "#" },
        { title: "Services", path: "#" },
        { title: "Contact us", path: "#" },
        { title: "Erc20", path: "#" },
    ]

    const toggleMenu = (e) => {
        // e.stopPropagation() // Prevent the click from triggering the handleClickOutside
        setIsMenuOpen((prev) => !prev)
    }

    return (
        <nav
            className={`bg-black pb-5 md:text-sm ${isMenuOpen ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}
            style={{ background: "#000014" }}
        >
            <div className="gap-x-14 items-center max-w-screen-2xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5  md:block">
                    <div className="inline-flex items-center p-0">
                        <Image
                            className="w-16 rounded-full m-0 p-0"
                            src={images.symbol}
                            alt="logo"
                        />

                        <p className="text-xl font-serif pl-2 m-0 p-0 item">
                            S e c u r i T r a c e
                        </p>
                    </div>
                    <div className="md:hidden">
                        <button
                            className={`menu-btn ${isMenuOpen ? "bg-gray-800 rounded-full" : "bg-gray-800 "}`}
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? <Nav3 /> : <Nav2 />}
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 items-center mt-8 md:mt-0 md:flex ${isMenuOpen ? "block" : "hidden"} menu`}
                >
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {navigation.map((item, idx) => (
                            <li
                                key={idx}
                                className="p-2 rounded-2xl text-gray-200 hover:text-gray-400 hover:shadow-md hover:shadow-gray-800"
                            >
                                <a href={item.path} className="block">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        {currentUser ? (
                            <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 active:bg-gray-900 rounded-full md:inline-flex hover:shadow-md hover:shadow-gray-600">
                                {currentUser.slice(0, 6)}......
                                {currentUser.slice(currentUser.length - 6)}
                            </p>
                        ) : (
                            <button
                                onClick={connectWallet}
                                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex hover:shadow-md hover:shadow-gray-800"
                                style={{ background: "#141421" }}
                            >
                                Connect Wallet
                                <Nav1 />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
