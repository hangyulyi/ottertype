import { TbMailFilled } from "react-icons/tb";
import { LuCode2 } from "react-icons/lu";

const Footer = () => {
    return (
        <footer className="text-sub-color py-4">
            <div className="container mx-auto flex justify-start space-x-4">

                <a
                    href="https://github.com/hangyulyi/ottertype"
                    className="flex items-center space-x-1 hover:text-text-color"
                >
                    <TbMailFilled />
                    <span>contact</span>
                </a>

                <a
                    href="https://github.com/hangyulyi/ottertype"
                    className="flex items-center space-x-1 hover:text-text-color"
                >
                    <LuCode2 />
                    <span>github</span>
                </a>
            </div>
        </footer>
    )
}

export default Footer;