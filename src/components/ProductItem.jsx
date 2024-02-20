import bottle from "@/assets/bottle.jpg";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";

const ProductItem = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-6">{product.name}</CardTitle>
        <img src={product.image_url} className="rounded " alt="" />
        <div>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p>Uploaded on: {dayjs(product.createdAt).format("DD MMM YYYY")}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
