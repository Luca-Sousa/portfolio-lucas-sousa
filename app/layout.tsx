import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/auth"

export const metadata: Metadata = {
  title: "Portfólio - Lucas Sousa",
  description: "Meu Portfólio de Projetos Web",
}

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
