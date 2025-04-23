"use client";

import { useState } from "react";
import { Home, ShoppingCart, DollarSign, Calendar, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import Image from "next/image";
import factory from '../public/factory.png'
import { useRouter } from "next/navigation";

const sidebarItems = [
    { title: "Dashboard", url: "/pages/dashboard", icon: Home },
    { title: "Calendar", url: "/calendar", icon: Calendar },
];

const purchaseItems = [
    { title: "Purchase Orders", url: "/pages/purchase" },
    { title: "Purchase History", url: "/pages/purchase/history" },
];

const saleItems = [
    { title: "Sale Orders", url: "/pages/sale" },
    { title: "Sale History", url: "/pages/sale/history" },
];

export default function AppSidebar() {
    const router = useRouter();
    const [isPurchaseOpen, setPurchaseOpen] = useState(false);
    const [isSaleOpen, setSaleOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "GET" });
            router.push("/pages/login"); // Redirect to login page
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <Sidebar>
            <SidebarContent >
                <SidebarGroup >
                    <SidebarGroupLabel>
                        <Image
                            src={factory}
                            alt="Image"
                            className="h-[54px] w-[54px] mt-10"
                        />
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-12">
                        <SidebarMenu>
                            {/* Main Sidebar Items */}
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* Purchase Orders - Collapsible */}
                            <Collapsible open={isPurchaseOpen} onOpenChange={setPurchaseOpen}>
                                <CollapsibleTrigger asChild>
                                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <ShoppingCart className="w-5 h-5" />
                                            <span>Purchase</span>
                                        </div>
                                        {isPurchaseOpen ? <ChevronDown /> : <ChevronRight />}
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-6 space-y-1">
                                    {purchaseItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.url}
                                            className="block p-2 rounded-md text-sm hover:bg-gray-100"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>

                            {/* Sale Orders - Collapsible */}
                            <Collapsible open={isSaleOpen} onOpenChange={setSaleOpen}>
                                <CollapsibleTrigger asChild>
                                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-5 h-5" />
                                            <span>Sale</span>
                                        </div>
                                        {isSaleOpen ? <ChevronDown /> : <ChevronRight />}
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-6 space-y-1">
                                    {saleItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.url}
                                            className="block p-2 rounded-md text-sm hover:bg-gray-100"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Logout Button */}
            <SidebarFooter>
                <Button
                    onClick={handleLogout}
                    className="text-white w-[200px] flex items-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
