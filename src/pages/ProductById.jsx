import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, MoveLeft, ShoppingCart, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Review from "./Review";
import { useCart } from "@/providers/CartProvider";
import { usePaystackPayment } from "react-paystack";
import { useAuth } from "@/providers/AuthProvider";
import { useInteractions } from "@/providers/InteractionsProvider";
import { toast } from "sonner";

const ProductById = () => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const user = getUser();

  const { addCartItem } = useCart();
  const initalizePayment = usePaystackPayment();
  const { setUserOrders } = useInteractions();

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/products/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

  const { mutate: makeOrder, isPending } = useMutation({
    mutationKey: ["orders"],
    mutationFn: async (values) => {
      return await axios
        .post(`${BASE_URL}/orders`, values)
        .then((res) => {
          toast.success(res.data.message);
          console.log(res.data.updated_user);
          setUserOrders(res.data.updated_user.orders);
        })
        .catch((err) => {});
    },
  });

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Loading product...
      </div>
    );
  }

  return (
    <div className="py-10 px-16">
      <Button
        onClick={() => navigate(-1)}
        size="icon"
        variant="ghost"
        className="text-black"
      >
        <MoveLeft className="h-8 w-8" />
      </Button>
      <div className="mt-6 flex items-start gap-24 ">
        <img className="w-[24rem] h-[24rem] rounded" src={product.image_url} />
        <div>
          <p className="text-4xl font-bold">{product.name}</p>
          <div className="py-4">
            <Badge variant="outline">{product.category}</Badge>
          </div>
          <p className="mt-4 opacity-90 max-w-lg">{product.description}</p>
          <p className="mt-2 max-w-lg flex items-center font-light">
            <span className="">Eco rating:</span>
            {[
              ...Array(product.eco_rating)
                .fill(0)
                .map((_, index) => (
                  <Star
                    key={index}
                    className="h-6 w-6 fill-orange-500 text-transparent"
                  />
                )),
            ]}
          </p>
          <p className="mt-2">Price: Ksh. {product.price}</p>
          <div className="flex items-center mt-10 gap-4">
            <Button
              disabled={isPending}
              onClick={() => {
                initalizePayment({
                  config: {
                    reference: new Date().getTime().toString(),
                    email: user?.email,
                    amount: product.price * 100,
                    currency: "KES",
                    publicKey,
                  },
                  onSuccess: () => {
                    makeOrder({
                      user_id: user.id,
                      product_ids: `${product.id}`,
                      quantities: "1",
                      total_price: product.price,
                    });
                  },
                });
              }}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Buy now
            </Button>
            <Button onClick={() => addCartItem(product)} variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <Review product={product} refetch={refetch} />
    </div>
  );
};

export default ProductById;
