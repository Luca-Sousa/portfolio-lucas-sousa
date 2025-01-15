import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SidebarProvider } from "../_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import AuthProvider from "../_providers/auth";
import { EdgeStoreProvider } from "../_lib/edgestore";
import { Toaster } from "sonner";

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
      <body className={`${inter.className} overflow-hidden antialiased`}>
        <AuthProvider>
          <EdgeStoreProvider>
            <SidebarProvider>
              <AppSidebar />
              {children}
            </SidebarProvider>
          </EdgeStoreProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
