export interface Product {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  category: string;
  rating?: number;
  description?: string;
  stock?: number;
}
