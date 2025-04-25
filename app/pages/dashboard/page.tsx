import { prisma } from "@/lib/prisma";
import PageTitle from '@/components/PageTitle';
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
        </div>

    );
};

export default Dashboard;
