import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const font = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ottertype",
  description: "a better animal than monkeys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
