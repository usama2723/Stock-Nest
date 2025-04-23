import { prisma } from "@/lib/prisma";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PageTitle from '@/components/PageTitle';
import UpdateProduct from "../../../components/updateProduct";
import DeleteProduct from "../../../components/deletProduct";
import AddProduct from "../../../components/addProduct";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";


const getProducts = async () => {
    return await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: {
                select: {
                    name: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });
};

const getBrands = async () => {
    return await prisma.brand.findMany();
};


const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};
const Purchase = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrands()]);
    return (
        <div className='space-y-5 pl-10 pr-10'>
            <PageTitle title='Purchase Orders' />

            <Table>
                <TableHeader className='bg-[#f1f5f9]'>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Create At</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{formatTime(product.updatedAt)}</TableCell>
                            <TableCell>{formatDate(product.createdAt)}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.brand?.name ?? "No Brand"}</TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48 bg-white p-2 shadow-md rounded-md ">
                                        <div className="flex flex-col">
                                            <UpdateProduct brands={brands} product={product} />
                                            <DeleteProduct product={product} />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddProduct brands={brands} />
        </div>
    );
}

export default Purchase;
