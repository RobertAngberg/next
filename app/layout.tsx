import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
