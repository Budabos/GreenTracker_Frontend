import ProductItem from "@/components/ProductItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Check, Filter, Loader2, Search, X } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [filterBy, setFilterBy] = useState([]);
  const [search, setSearch] = useState("");
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
  const searchedProducts = products.filter((product) =>
    product.name.includes(search.toLowerCase())
  );

  const renderedProducts = searchedProducts
    .filter((product) => {
      if (filterBy.length === 0) {
        return product;
      }

      return filterBy.includes(product.category);
    })
    .slice(pageOffset, endOffset);
  const pageCount = Math.ceil(renderedProducts.length / 9);

  const handlePageClick = (pageNum) => {
    const newOffset = (pageNum * 9) % products.length;
    setPageOffset(newOffset);
  };

  const categories = new Set(products.map(({ category }) => category));

  const removeFilter = (category) => {
    const updatedFilters = filterBy.filter((filter) => filter !== category);
    setFilterBy(updatedFilters);
  };

  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold">Available Products</h1>
      <div>
        <div className="mt-5 flex items-center justify-between">
          <div className="relative w-[28rem]">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
            />
            <Search className="h-4 w-4 absolute top-1/2 translate-y-[-50%] right-3" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="secondary">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[...categories].map((category) => (
                <DropdownMenuItem
                  onClick={() => {
                    if (!filterBy.includes(category)) {
                      setFilterBy((prevFilters) => [...prevFilters, category]);
                    } else {
                      removeFilter(category);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {filterBy.includes(category) && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="font-medium flex items-center">
          {filterBy.length !== 0 && "Applied filters:"}
          {filterBy.map((category) => (
            <div className="py-2 mr-2">
              <Badge variant="outline">
                {category}{" "}
                <X
                  onClick={() => removeFilter(category)}
                  className="ml-2 h-4 w-4 cursor-pointer"
                />
              </Badge>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-8 pt-8">
          {renderedProducts.map((product) => (
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
