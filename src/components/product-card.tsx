import { Star } from "lucide-react";
import { Product } from "../types";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="p-0">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-52 object-cover rounded-t-lg"
      />
    </CardHeader>
    <CardContent className="pt-4 space-y-2">
      <CardTitle className="text-base truncate">{product.title}</CardTitle>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-blue-600">
          ${product.price}
        </span>
        <Badge variant="outline" className="flex items-center">
          <Star className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" />
          {product.rating.rate}
        </Badge>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Add to Cart</Button>
    </CardFooter>
  </Card>
);

export default ProductCard;
