import type { Metadata } from "next";
import "../../globals.css";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Space | Verse-X",
  description: "Space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {children}
    </>
  );
}
