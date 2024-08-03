import Image from "next/image";

import { Jost } from "next/font/google";

const jost = Jost({
    subsets: ['latin']
})

const Header = () => {
    return (
        <div className="py-10 px-12">
            <header className="flex cursor-pointer">
                <Image src={`/pixelotter.png`} alt="Logo" width={50} height={50} />
                <h1 className={`${jost.className} font-logo text-text-color text-4xl tracking-wide font-medium`}>ottertype</h1>
            </header>
        </div>
    )
}

export default Header;