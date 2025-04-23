"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async (productId: number) => {
        setIsLoading(true);
        try {
            await axios.delete(`/api/products/${productId}`);
            setIsLoading(false);
            setIsDialogOpen(false);
            router.refresh();
        } catch (err) {
            setIsLoading(false);
            console.error("Failed to delete the product", err);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {!isLoading ? (
                    <button
                        className="hover:bg-slate-100 rounded-md text-base sm:text-base"
                    >
                        Delete
                    </button>
                ) : (
                    <Button type="button" className="btn loading px-4 py-2">
                        Deleting...
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">
                        Are you sure you want to delete this data?
                    </DialogTitle>
                </DialogHeader>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                    <Button
                        onClick={() => handleDelete(product.id)}
                        type="submit"
                        disabled={isLoading}
                        className="sm:w-auto"
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => setIsDialogOpen(false)}
                        type="button"
                        className="sm:w-auto"
                    >
                        No
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default DeleteProduct;
