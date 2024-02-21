import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DataStatus } from "../global/global-enum";

export enum Category {
  TOKYO = 'Tokyo',
  TECH = 'Tech',
  LAB = 'Lab'
}

@Schema({
  timestamps: true
})
export class Product {

  @Prop()
  status: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product)