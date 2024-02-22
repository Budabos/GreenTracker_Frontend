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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, MoveLeft, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Review from "./Review";

const ProductById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, refetch } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/products/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
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
      <div className="mt-6 flex items-start gap-24">
        <img className="w-[24rem] h-[24rem] rounded" src={product.image_url} />
        <div>
          <p className="text-4xl font-bold">{product.name}</p>
          <div className="py-4">
            <Badge variant="outline">{product.category}</Badge>
          </div>
          <p className="mt-4 opacity-70 max-w-lg">{product.description}</p>
          <p className="mt-2 max-w-lg flex items-center font-light">
            <span className="opacity-65">Eco rating:</span>
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
        </div>
      </div>
      <Review product={product} refetch={refetch}/>
    </div>
  );
};

export default ProductById;
