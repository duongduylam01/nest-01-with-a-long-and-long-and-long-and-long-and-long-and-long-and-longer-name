import { Category } from "../schema/product.schema";

export class UpdateProductDto {
  status: string;
  title: string;
  price: number;
}