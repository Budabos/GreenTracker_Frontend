import ProductItem from "@/components/ProductItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Products = () => {
  const products = [
    {
      name: "Product 1",
      description: "This is a description of product 1.",
      category: "Electronics",
      brand: "Apple",
      price: "10.0",
      eco_rating: "A",
      manufacturer_link: "https://www.example.com/product/1",
      createdAt: "2024-02-18T00:47:14.649750",
    },
    {
      name: "Product 2",
      description: "This is a description of product 2.",
      category: "Clothing",
      brand: "Nike",
      price: "15.0",
      eco_rating: "B",
      manufacturer_link: "https://www.example.com/product/2",
      createdAt: "2024-02-18T00:47:14.649825",
    },
    {
      name: "Product 3",
      description: "This is a description of product 3.",
      category: "Home & Garden",
      brand: "Ikea",
      price: "20.0",
      eco_rating: "C",
      manufacturer_link: "https://www.example.com/product/3",
      createdAt: "2024-02-18T00:47:14.649833",
    },
    {
      name: "Product 4",
      description: "This is a description of product 4.",
      category: "Electronics",
      brand: "Apple",
      price: "25.0",
      eco_rating: "A",
      manufacturer_link: "https://www.example.com/product/4",
      createdAt: "2024-02-18T00:47:14.649865",
    },
    {
      name: "Product 5",
      description: "This is a description of product 5.",
      category: "Clothing",
      brand: "Nike",
      price: "30.0",
      eco_rating: "B",
      manufacturer_link: "https://www.example.com/product/5",
      createdAt: "2024-02-18T00:47:14.649892",
    },
    {
      name: "Product 6",
      description: "This is a description of product 6.",
      category: "Home & Garden",
      brand: "Ikea",
      price: "35.0",
      eco_rating: "C",
      manufacturer_link: "https://www.example.com/product/6",
      createdAt: "2024-02-18T00:47:14.649901",
    },
    {
      name: "Product 7",
      description: "This is a description of product 7.",
      category: "Electronics",
      brand: "Apple",
      price: "40.0",
      eco_rating: "A",
      manufacturer_link: "https://www.example.com/product/7",
      createdAt: "2024-02-18T00:47:14.649909",
    },
    {
      name: "Product 8",
      description: "This is a description of product 8.",
      category: "Clothing",
      brand: "Nike",
      price: "45.0",
      eco_rating: "B",
      manufacturer_link: "https://www.example.com/product/8",
      createdAt: "2024-02-18T00:47:14.649934",
    },
    {
      name: "Product 9",
      description: "This is a description of product 9.",
      category: "Home & Garden",
      brand: "Ikea",
      price: "50.0",
      eco_rating: "C",
      manufacturer_link: "https://www.example.com/product/9",
      createdAt: "2024-02-18T00:47:14.649942",
    },
    {
      name: "Product 10",
      description: "This is a description of product 10.",
      category: "Electronics",
      brand: "Apple",
      price: "55.0",
      eco_rating: "A",
      manufacturer_link: "https://www.example.com/product/10",
      createdAt: "2024-02-18T00:47:14.649942",
    },
  ];

  // const { data: products, isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => {
  //     const data = await axios
  //       .get("https://api.mockapi.com/api/v1/products", {
  //         headers: {
  //           "x-api-key": "sdf",
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Headers": "*",
  //         },
  //       })
  //       .then((res) => {
  //         return res;
  //       })
  //       .catch((err) => console.error(err.message));

  //     return data;
  //   },
  // });

  const isLoading = false;

  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold">Available Products</h1>
      {isLoading ? (
        <div className="flex items-center justify-center text-xl h-[60dvh]">
          <Loader2 className="mr-4 h-8 w-8 animate-spin" />
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8 pt-8">
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
