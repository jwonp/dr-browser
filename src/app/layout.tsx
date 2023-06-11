import AppBar from "@/components/frames/AppBar/AppBar";
import "./globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "door lock",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
