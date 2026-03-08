import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "Solfeggio Frequencies",
  description: "Browser-based Solfeggio frequency tone generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
