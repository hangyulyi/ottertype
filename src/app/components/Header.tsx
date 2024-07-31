import Image from "next/image";

import { Jost } from "next/font/google";

const jost = Jost({
    subsets: ['latin']
})

const Header = () => {
    return (
        <header className="p-10 flex">
            <Image src={`/pixelotter.png`} alt="Logo" width={50} height={50} />
            <h1 className={`${jost.className} font-logo text-text-color text-4xl tracking-wide font-medium`}>ottertype</h1>
        </header>
    )
}

export default Header;