import AddProduct from "@/components/AddProduct";
import ProductCardList from "@/components/ProductCardList";
import ViewSelector from "@/components/ViewSelector";
import { DataTable } from "@/components/ui/data-table";
import { BASE_URL, numberFormat } from "@/lib/utils";
import { columns } from "@/tables/products/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Ghost, Loader2 } from "lucide-react";
import React, { useState } from "react";

const DashboardProducts = () => {
  const [active, setActive] = useState("grid");
  const { data: products, isLoading, refetch } = useQuery({
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

  if (isLoading || !products) {
    return (
      <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Loading products...
      </div>
    );
  } else if (products.length === 0) {
    return (
      <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
        <Ghost className="mr-4 h-12 w-12" />
        No products found...
      </div>
    );
  }

  return (
    <div className="my-8 px-8 flex-1">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Products</h1>
          <div className="flex items-center gap-10">
            <AddProduct callback={refetch}/>
            <ViewSelector active={active} setActive={setActive} />
          </div>
        </div>
      </div>
      {active === "grid" && <ProductCardList products={products} refetch={refetch} />}
      {active === "list" && <DataTable data={products} columns={columns} />}
    </div>
  );
};

export default DashboardProducts;
