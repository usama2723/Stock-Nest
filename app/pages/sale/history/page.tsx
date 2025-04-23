"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Input } from "@/components/ui/input";

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

const SalesHistory = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [brandFilter, setBrandFilter] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Extract unique brands from products
    const uniqueBrands = Array.from(new Set(products.map((product) => product.brand?.name))).filter(Boolean);

    // Filter products based on search, brand, and date range
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = brandFilter ? product.brand?.name === brandFilter : true;

        const productDate = new Date(product.createdAt);
        const matchesDate =
            (!startDate || productDate >= startDate) && (!endDate || productDate <= endDate);

        return matchesSearch && matchesBrand && matchesDate;
    });

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Sales History", 14, 15);

        const tableColumn = ["#", "Product Name", "Updated At", "Created At", "Price", "Brand"];
        const tableRows: any[] = [];

        filteredProducts.forEach((product, index) => {
            tableRows.push([
                index + 1,
                product.title,
                formatDate(product.updatedAt),
                formatTime(product.createdAt),
                `${product.price.toFixed(2)} Pkr`,
                product.brand?.name ?? "No Brand",
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 25,
        });

        doc.save("sales-history.pdf");
    };

    return (
        <div className="space-y-5 px-10">
            <PageTitle title="Sales History" />

            <div className="flex flex-wrap justify-between space-x-3">
                {/* Search Input */}
                <Input
                    className="md:w-[250px]"
                    type="search"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={exportToPDF}>Export to PDF</Button>
            </div>

            <Table>
                <TableHeader className="bg-[#f1f5f9]">
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Brand</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>
                                    {formatDate(product.updatedAt)}
                                </TableCell>
                                <TableCell>
                                    {formatTime(product.createdAt)}
                                </TableCell>
                                <TableCell>{product.price.toFixed(2)} Pkr</TableCell>
                                <TableCell>{product.brand?.name ?? "No Brand"}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                No results found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>



            </Table>
        </div>
    );
};

export default SalesHistory;
