import { prisma } from "@/lib/prisma";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import PageTitle from '@/components/PageTitle';
// import AddProduct from "../../../components/addProduct";
// import DeleteProduct from "../../../components/deleteProduct";
// import UpdateProduct from "../../../components/updateProduct";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { BarChartComponent } from "@/components/BarChart";

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

const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const Dashboard = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrands()]);

    return (
        <div className='space-y-5 pl-10 pr-10'>
            <PageTitle title='Dashboard' />

            <ChartAreaInteractive />
            <div className=" justify-between flex flex-row">
                <div className="w-[500px] h-[100px]">
                    <BarChartComponent />
                </div>
                <div className="w-[500px] h-[100px]">
                    <BarChartComponent />
                </div>
            </div>
            {/* <Table>
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
                  <div className="justify-between items-center flex">
                    <UpdateProduct brands={brands} product={product} />
                    <DeleteProduct product={product} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddProduct brands={brands} /> */}
        </div>

    );
};

export default Dashboard;
