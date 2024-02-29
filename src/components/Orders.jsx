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
import { useInteractions } from "@/providers/InteractionsProvider";

const Orders = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const [products, setProducts] = useState([]);
  const { orderDetails } = useInteractions();

  return (
    <div className="mb-14 mt-8">
      <div className="flex flex-col gap-10">
        {orderDetails?.map(({ id, products, total_price }) => {
          console.log(products);
          return (
            <Card className="shadow-md" key={id}>
              <CardHeader>
                <CardTitle>
                  <h3 className="font-bold text-2xl">Order {id}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div key={id} className="flex flex-col">
                  <div className="grid grid-cols-2 gap-6 mt-3">
                    {products?.map(({ product, quantity }) => {
                      if (product) {
                        // console.log(product);
                        return (
                          <div
                            className="flex items-start gap-4"
                            key={product?.id}
                          >
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
                      }
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
