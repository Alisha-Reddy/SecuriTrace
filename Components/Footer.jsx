import { Fot1, Fot2 } from "../Components/index"

export default () => {
    const footerNavs = [
        {
            href: "javascript:void()",
            name: "Terms",
        },
        {
            href: "javascript:void()",
            name: "License",
        },
        {
            href: "javascript:void()",
            name: "Privacy",
        },
        {
            href: "javascript:void()",
            name: "About us",
        },
    ]

    return (
        <footer className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4text-gray-600 md:px-8">
                <div className="justify-between sm:flex">
                    <div className="space-y-6">
                        <img src="https://floatui.com/logo.svg" className="w-32" />
                        <p className="max-w-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quod
                            tempora facilis velit laborum.
                        </p>
                        <ul className="flex felx-wrap items-center gap-4 text-sm sm:text-base">
                            {footerNavs.map((item, idx) => {
                                return (
                                    <li className="text-gray-800 hover:text-gray-500 duration-150">
                                        <a key={idx} href={item.href}>
                                            {item.name}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-700 font-semibold">Get the app</p>
                        <div className="flex items-center gap-3 mt-0 ">
                            <a href="javascript:void(0)" className="mt-0 block sm:mt-3">
                                <Fot1></Fot1>
                                {/* Google play icon */}
                            </a>
                            <a href="javascript:void(0)" className="mt-0 block sm:mt-3">
                                <Fot2></Fot2>
                                {/* App store icon */}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-1 py-10 border-t md:text-center">
                    <p>© 2024 Alisha Reddy Kondaou. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
