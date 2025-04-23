"use client"

import { Button } from "@/components/ui/button"
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner"; 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
};

const UpdateProduct = ({ brands, product }: { brands: Brand[], product: Product }) => {
    const [title, setTitle] = useState<string>(product.title);
    const [price, setPrice] = useState<number>(product.price);
    const [brand, setBrand] = useState<number>(product.brandId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/products/${product.id}`, {
                title,
                price,
                brandId: brand,
            });
            toast.success(`The product "${title}" was successfully updated.`);
            setIsDialogOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("There was an issue updating the product.");
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="hover:bg-slate-100 rounded-md">Edit</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update {product.title}</DialogTitle>
                    <DialogDescription>Here you can update product details.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Product Name</Label>
                        <Input
                            className="bg-white border border-black"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Price</Label>
                        <Input
                            className="bg-white border border-black"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <Label>Brand</Label>
                    <Select
                        value={String(brand)}
                        onValueChange={(value) => setBrand(Number(value))}
                    >
                        <SelectTrigger className="bg-white border border-black">
                            <SelectValue placeholder="Select a brand">
                                {brands.find((b) => b.id === brand)?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Brands</SelectLabel>
                                {brands.map((brand) => (
                                    <SelectItem
                                        key={brand.id}
                                        value={String(brand.id)}
                                    >
                                        {brand.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpdate} type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProduct;
