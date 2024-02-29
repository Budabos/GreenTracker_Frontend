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
import {
  Check,
  Filter,
  MoreHorizontal,
  PenLine,
  Search,
  Trash,
} from "lucide-react";
import { useState } from "react";
import DeleteItem from "./DeleteItem";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditItem from "./EditItem";
import AddProduct, { productSchema } from "./AddProduct";

const ProductCardList = ({ products, setProducts, filterBy, setFilterBy }) => {
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState("");
  const [pageOffset, setPageOffset] = useState(0);
  const categories = new Set(products.map(({ category }) => category));

  const endOffset = pageOffset + 9;
  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderedProducts = searchedProducts.filter((product) => {
    if (filterBy.length < 1) return product;

    if (filterBy.includes(product.category)) {
      return product;
    }
  });
  const pageCount = Math.ceil(renderedProducts.length / 9);

  const handlePageClick = (pageNum) => {
    const newOffset = (pageNum * 9) % products.length;
    setPageOffset(newOffset);
  };

  const { mutate: deleteProduct, isPending: pendingDeletion } = useMutation({
    mutationKey: ["products"],
    mutationFn: async (id) => {
      return await axios
        .delete(`${BASE_URL}/products/${id}`)
        .then((res) => {
          toast.success("Product deleted successfully");

          const updatedProducts = products.filter(
            (product) => product.id !== id
          );
          setProducts(updatedProducts);
        })
        .catch((err) => toast.error(err.data.message));
    },
  });

  const { mutate: editProduct, isPending: pendingEdit } = useMutation({
    mutationKey: ["products"],
    mutationFn: async ([id, values]) => {
      return await axios
        .patch(`${BASE_URL}/products/${id}`, values)
        .then((res) => {
          toast.success(res.data.message);

          const updatedProducts = products.map((product) => {
            if (product.id === id) {
              return res.data.product;
            }

            return product;
          });

          setProducts(updatedProducts);
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
        <div className="flex items-center gap-6">
          <AddProduct setProducts={setProducts} />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[...categories].map((category) => (
                <DropdownMenuItem
                  onClick={() => {
                    if (filterBy.includes(category)) {
                      const updatedFilters = filterBy.filter(
                        (filter) => filter !== category
                      );
                      setFilterBy(updatedFilters);
                    } else {
                      setFilterBy((prev) => [...prev, category]);
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
      </div>
      <div className="mt-10 grid grid-cols-3 gap-6">
        {renderedProducts.slice(pageOffset, endOffset).map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center  justify-between gap-4">
                <CardTitle>{product.name}</CardTitle>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DialogTrigger asChild onClick={() => setDialog("edit")}>
                        <DropdownMenuItem>
                          <PenLine className="mr-2 h-4 w-4" />
                          Edit product
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogTrigger
                        onClick={() => setDialog("delete")}
                        asChild
                      >
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete product
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {dialog === "delete" && (
                    <DeleteItem
                      itemType="product"
                      id={product.id}
                      isPending={pendingDeletion}
                      action={deleteProduct}
                    />
                  )}
                  {dialog === "edit" && (
                    <EditItem
                      item={product}
                      action={editProduct}
                      isPending={pendingEdit}
                      schema={productSchema}
                    />
                  )}
                </Dialog>
              </div>
              <div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <CardDescription className="pt-6">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="opacity-80 text-sm">
              <p>{numberFormat(product.price)}</p>
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
