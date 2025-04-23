"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showSidebar = pathname.startsWith("/pages/dashboard") || pathname.startsWith("/pages/purchase") || pathname.startsWith("/pages/sale");
    return (
        <SidebarProvider>
            <div className={cn("min-h-screen w-full flex", inter.className)}>
                {showSidebar && <AppSidebar />}
                <main className="w-full">
                    {showSidebar && <SidebarTrigger />}
                    {children}
                </main>
            </div>
            <Toaster />
        </SidebarProvider>
    );
}
