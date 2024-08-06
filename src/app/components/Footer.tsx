import { TbMailFilled } from "react-icons/tb";
import { LuCode2 } from "react-icons/lu";

// TODO: link contact page with maybe contact page on portfolio site

const Footer = () => {
    return (
        <footer className="text-sub-color py-4 w-full">
            <div className="container mx-auto flex justify-start space-x-4">

                <a
                    href="https://www.linkedin.com/in/yihangyul/"
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