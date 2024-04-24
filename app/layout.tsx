import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./Navbar";
import SessionProvider from "../SessionProvider";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I'm gay",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession();

  // if (!session || !session.user) {
  //   redirect("/api/auth/signin");
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionProvider session={session}>
        <Navbar />
        {children}
        </SessionProvider> */}
      </body>
    </html>
  );
}
