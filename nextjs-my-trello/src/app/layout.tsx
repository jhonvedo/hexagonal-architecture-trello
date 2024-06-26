import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Modal from "../components/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Trello",
  description: "Created by Jhon Acevedo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Modal/>
      </body>
    </html>
  );
}
