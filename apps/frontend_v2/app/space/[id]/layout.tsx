import type { Metadata } from "next";
import "../../globals.css";



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
