import { Category } from "../schema/product.schema";
import * as Joi from "joi";

export class UpdateProductDto {
  status: string;
  title: string;
  price: number;

  static schema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
  });
}