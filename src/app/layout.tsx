import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Correia | Perfumes",
  description: "Curadoria exclusiva e premium de perfumes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} antialiased bg-[#0a0a0a] text-white`}
    >
      <body className="min-h-screen flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
