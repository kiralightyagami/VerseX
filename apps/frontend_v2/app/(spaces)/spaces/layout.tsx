import type { Metadata } from "next";
import "../../globals.css";



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
    {children}
    </>
  );
}