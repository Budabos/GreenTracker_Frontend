import { BASE_URL } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Orders = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const [products, setProducts] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/products`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    },
  });

  if (isLoading || !products) {
    return (
      <div className="flex items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Loading past orders...
      </div>
    );
  }

  return (
    <div className="mb-14">
      <h2 className="text-2xl font-bold my-6">My orders</h2>
      <div className="flex flex-col gap-10">
        {user.orders.map(({ id, order_products, total_price }) => {
          return (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>
                  <h3 className="font-bold text-2xl">Order {id}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div key={id} className="flex flex-col">
                  <div className="grid grid-cols-2 gap-6 mt-3">
                    {order_products.map(({ id, product_id, quantity }) => {
                      const product = products.find(
                        (product) => product.id == product_id
                      );

                      return (
                        <div className="flex items-start gap-4" key={id}>
                          <img
                            src={product?.image_url}
                            alt={product?.name}
                            className="w-28 h-28 rounded"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-lg text-primary">
                              {product?.name}
                            </span>
                            <span className="font-semibold">x{quantity}</span>
                            <span className="text-sm">
                              Ksh. {product?.price * quantity}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <span className="mt-6 text-sm font-medium">
                    Sub-total: Ksh. {total_price}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
