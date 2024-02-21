import { Category } from "../schema/product.schema";

export class CreateProductDto {
  status: string;
  title: string;
  price: number;
}