import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

const readexPro = Readex_Pro({
  subsets: ["latin", "arabic"],
  variable: "--font-readex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORIS Coffee House | دعوتكم",
  description:
    "حيث القهوة طقسٌ للصحوة، والحضارة تتجدد في كل فنجان. Welcome to the sanctuary of ORIS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={readexPro.variable}>
      <body className="antialiased min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
