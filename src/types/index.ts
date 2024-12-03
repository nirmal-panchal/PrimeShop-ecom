export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
