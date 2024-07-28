import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

import "./globals.css";

import Footer from "./components/Footer";

const font = Roboto_Mono({ subsets: ["latin"] });

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
        {children}
        <Footer />
      </body>

    </html>
  );
}
