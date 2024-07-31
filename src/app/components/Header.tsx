import Image from "next/image";

import { Nunito_Sans } from "next/font/google";

const nunito_sans = Nunito_Sans({
    subsets: ['latin'],
    weight: '500'
})

const Header = () => {
    return (
        <header className="p-10 flex">
            <Image src={`/pixelotter.png`} alt="Logo" width={50} height={50} />
            <h1 className={`${nunito_sans.className} font-logo text-text-color text-4xl`}>ottertype</h1>
        </header>
    )
}

export default Header;