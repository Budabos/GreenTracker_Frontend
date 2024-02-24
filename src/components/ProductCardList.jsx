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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL, numberFormat } from "@/lib/utils";
import { MoreHorizontal, PenLine, Search, Trash } from "lucide-react";
import { useState } from "react";
import DeleteItem from "./DeleteItem";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "./ui/dialog";

const ProductCardList = ({ products, refetch }) => {
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: async (id) => {
      return await axios
        .delete(`${BASE_URL}/products/${id}`)
        .then((res) => {
          toast.success("Product deleted successfully");
          refetch();
        })
        .catch((err) => toast.error(err.data.message));
    },
  });

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
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PenLine className="mr-2 h-4 w-4" />
                        Edit product
                      </DropdownMenuItem>
                      <DialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete product
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DeleteItem
                    itemType="product"
                    id={id}
                    isPending={isPending}
                    action={mutate}
                  />
                </Dialog>
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
