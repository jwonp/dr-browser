import Drawer from "@/components/Drawer/Drawer";
import "./globals.scss";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
// const font = localFont({ src: "./fonts/BinggraeTaom" });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "door lock",
};

export default function RootLayout({
  children,
  selectModal,
}: {
  children: React.ReactNode;
  selectModal: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Drawer />
        <Header />
        <main>{children}</main>
        <section>{selectModal}</section>
      </body>
    </html>
  );
}
