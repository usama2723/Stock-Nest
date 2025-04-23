"use client";

import { Button } from "@/components/ui/button";
import { useState, SyntheticEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");  // New quantity field
    const [amount, setAmount] = useState("");      // New amount field
    const [rate, setRate] = useState("");          // New rate field
    const [brand, setBrand] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/products", {
                title: title,
                price: Number(price),
                brandId: Number(brand),
                quantity: Number(quantity),  // Sending quantity
                amount: Number(amount),      // Sending amount
                rate: Number(rate),          // Sending rate
            });
            toast({
                title: "Product added",
                description: `The product ${title} was successfully added.`,
                duration: 5000,
            });
            router.refresh();
            setIsDialogOpen(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an issue adding the product.",
                duration: 5000,
            });
        }
        setTitle("");
        setPrice("");
        setBrand("");
        setQuantity("");  // Resetting quantity
        setAmount("");    // Resetting amount
        setRate("");      // Resetting rate
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <div className="fixed bottom-4 right-4 w-[55px] h-[55px] bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                    <Plus className="w-[25px] h-[25px] text-white" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>Add Devices</DialogTitle>
                    <DialogDescription>
                        Here you have to add new Devices.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input
                                className="bg-white border border-black"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        {/* Price Input */}
                        <div className="flex flex-col gap-2">
                            <Label>Price</Label>
                            <Input
                                className="bg-white border border-black"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {/* Quantity and Amount Input in a Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Quantity Input */}
                        <div className="flex flex-col gap-2">
                            <Label>Quantity</Label>
                            <Input
                                className="bg-white border border-black"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        {/* Amount Input */}
                        <div className="flex flex-col gap-2">
                            <Label>Amount</Label>
                            <Input
                                className="bg-white border border-black"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Rate</Label>
                            <Input
                                className="bg-white border border-black"
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                required
                            />
                        </div>
                        {/* Brand Select Below the Other Fields */}
                        <div className="flex flex-col gap-2">
                            <Label>Brand</Label>
                            <Select value={brand} onValueChange={(value) => setBrand(value)} required>
                                <SelectTrigger className="bg-white border-black">
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Brands</SelectLabel>
                                        {brands.map((brand) => (
                                            <SelectItem key={brand.id} value={String(brand.id)}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProduct;
