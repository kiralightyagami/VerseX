import type { Metadata } from "next";
import "../../globals.css";
import Image from "next/image";
import Link from "next/link";



export const metadata: Metadata = {
  title: "Join Space | Verse-X",
  description: "Join a space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Link href="/">
    <div className='flex items-center justify-center mt-4 hover:cursor-pointer'>
          <Image src="/logo.svg" alt="logo" width={40} height={40}/>
          <h1 className='text-xl font-bold '>Verse-X</h1> 
    </div>
    </Link>
    {children}
    </>
  );
}