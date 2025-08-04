import type { Metadata } from "next";
import "../../globals.css";


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
        {children}
      </>
  );
}
