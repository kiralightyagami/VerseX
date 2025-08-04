import type { Metadata } from "next";
import "../../globals.css";
import Link from "next/link";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Login | Verse-X",
  description: "Signin to your account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
       <Link href="/">
    <div className='flex items-center justify-center mt-10 hover:cursor-pointer'>
          <Image src="/logo.svg" alt="logo" width={40} height={40}/>
          <h1 className='text-xl font-bold '>Verse-X</h1> 
    </div>
    </Link>
        {children}
      </>
  );
}
