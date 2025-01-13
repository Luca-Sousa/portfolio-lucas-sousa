import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Card } from "../_components/ui/card";

export const metadata: Metadata = {
  title: "Portfólio - Lucas Sousa",
  description: "Meu Portfólio de Projetos Web",
};

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col gap-4 overflow-hidden p-4 pb-[86px] sm:mx-auto sm:max-w-xl sm:gap-8 sm:py-8 md:max-w-2xl lg:h-full lg:max-w-4xl xl:max-w-[1536px] xl:flex-row xl:px-8 2xl:px-0">
          <div className="xl:hidden">{/* <SidebarHomeMobile /> */}</div>

          <div className="hidden xl:block">{/* <SidebarHomeDesktop /> */}</div>

          <Card className="flex h-full w-full flex-col overflow-hidden bg-popover sm:relative">
            {/* <NavbarHome /> */}
            {children}
          </Card>
        </div>
      </body>
    </html>
  );
}
