import { Inter } from "next/font/google";
import "./globals.css";
import {Header} from '@/app/ui/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TODO LIST",
  description: "Created by Diego Lopez",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
