import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { numberFormat } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProductItem = ({ product }) => {
  const { addCartItem } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-6">{product.name}</CardTitle>
        <img src={product.image_url} className="rounded " alt="" />
        <div className="py-2">
          <Badge variant="outline">{product.category}</Badge>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{numberFormat(product.price)}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          onClick={() => addCartItem(product)}
          className="bg-black text-white"
        >
          Add to cart
        </Button>
        <Button asChild variant="outline">
          <Link to={`/products/${product.id}`}>See more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
