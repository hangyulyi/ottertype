import type { Metadata } from "next";
import { Roboto_Mono, Nunito_Sans } from "next/font/google";

import "./globals.css";

import Footer from "./components/Footer";
import Header from "./components/Header";

const font = Roboto_Mono({ subsets: ["latin"] });
const nunito_sans = Nunito_Sans({ subsets: ["latin"], weight: '500' })

export const metadata: Metadata = {
  title: "ottertype",
  description: "otters are cool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
        <Footer />
      </body>

    </html>
  );
}
