import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { numberFormat } from "@/lib/utils";
import { MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";

const ProductCardList = ({ products }) => {
  const [search, setSearch] = useState("");
  const [pageOffset, setPageOffset] = useState(0);

  const endOffset = pageOffset + 9;
  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search)
  );

  const renderedProducts = searchedProducts.slice(pageOffset, endOffset);
  const pageCount = Math.ceil(searchedProducts.length / 9);

  const handlePageClick = (pageNum) => {
    const newOffset = (pageNum * 9) % products.length;
    setPageOffset(newOffset);
  };


  return (
    <>
      <div className="mt-5 flex items-center justify-between">
        <div className="relative w-[28rem]">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
          />
          <Search className="h-4 w-4 absolute top-1/2 translate-y-[-50%] right-3" />
        </div>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-6">
        {renderedProducts.map(({ id, name, category, description, price }) => (
          <Card key={id}>
            <CardHeader>
              <div className="flex items-center  justify-between gap-4">
                <CardTitle>{name}</CardTitle>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal />
                </Button>
              </div>
              <div>
                <Badge variant="outline">{category}</Badge>
              </div>
              <CardDescription className="pt-6">{description}</CardDescription>
            </CardHeader>
            <CardContent className="opacity-80 text-sm">
              <p>{numberFormat(price)}</p>
            </CardContent>
          </Card>
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
    </>
  );
};

export default ProductCardList;
