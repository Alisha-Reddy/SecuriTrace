import { useEffect, useState, useContext } from "react"
import { TrackingContext } from "@/Context/Tracking"
import { Nav1, Nav2, Nav3 } from "../Components/index"

export default () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { currentUser, connectWallet } = useContext(TrackingContext)

    const navigation = [
        { title: "Home", path: "#" },
        { title: "Services", path: "#" },
        { title: "Contact us", path: "#" },
        { title: "Erc20", path: "#" },
    ]

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".menu-btn") && !e.target.closest(".menu")) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    return (
        <nav
            className={`bg-black pb-5 md:text-sm ${isMenuOpen ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}
            style={{ background: "#000014" }}
        >
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a href="#">
                        <img
                            src="https://floatui.com/logo.svg"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <div className="md:hidden">
                        <button
                            className={`menu-btn text-gray-200 hover:text-gray-400 ${isMenuOpen ? "bg-gray-800" : "bg-gray-900"}`}
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
                                <Nav3 />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
