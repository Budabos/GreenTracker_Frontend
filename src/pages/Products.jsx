import ProductItem from "@/components/ProductItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BASE_URL } from "@/lib/utils";

const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/products`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.error(err.message));
    },
  });

  const [pageOffset, setPageOffset] = useState(0);

  if (isLoading || !products) {
    return (
      <div className="flex items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Loading products...
      </div>
    );
  }

  const endOffset = pageOffset + 9;
  const renderedProducts = products.slice(pageOffset, endOffset);
  const pageCount = Math.ceil(products.length / 9);

  const handlePageClick = (pageNum) => {
    const newOffset = (pageNum * 9) % products.length;
    setPageOffset(newOffset);
  };

  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold">Available Products</h1>
      <div>
        <div className="grid grid-cols-3 gap-8 pt-8">
          {renderedProducts.map((product, index) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={pageOffset === 0 && "cursor-not-allowed"}
                onClick={() => setPageOffset(pageOffset - 9)}
              />
            </PaginationItem>
            {new Array(pageCount).fill(0).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index * 9 === pageOffset}
                  onClick={() => handlePageClick(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={
                  pageOffset === (pageCount - 1) * 9 && "cursor-not-allowed"
                }
                onClick={() => setPageOffset(pageOffset + 9)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Products;
