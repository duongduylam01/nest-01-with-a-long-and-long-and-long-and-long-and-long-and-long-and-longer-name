import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, Product } from "../schema/product.schema";
import mongoose from "mongoose";
import { DataStatus } from "../global/global-enum";
import { exec } from "child_process";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>
  ) {
  }

  private acitveCondition() {
    return { status: DataStatus.ACTIVE };
  }

  async findAll(pageNum: number = 1, pageSize: number = 10): Promise<{ data: Product[], total: number }> {
    // const [data, total] = await Promise.all([
    //   this.productModel.find(this.acitveCondition()).sort({ createdAt: -1 }).skip((pageNum-1)*pageSize).limit(pageSize),
    //   this.productModel.countDocuments(this.acitveCondition())
    // ]);

    const data = await this.productModel.find(this.acitveCondition()).sort({ createdAt: -1 }).skip((pageNum-1)*pageSize).limit(pageSize);
    const total = await this.productModel.countDocuments(this.acitveCondition());
    return { data, total };
  }

  async create(product: Product): Promise<Product> {
    product.status = DataStatus.ACTIVE;
    const res = await this.productModel.create(product);
    return res;
  }

  async findById(id: string): Promise<Product> {
    const res = await this.productModel.findById(id).where(this.acitveCondition());
    if (!res) {
      throw new NotFoundException("Product not found");
    }
    return res;
  }

  async updateById(id: string, product: Product): Promise<Product> {
    const res = await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true
    }).where(this.acitveCondition());
    if (!res) {
      throw new NotFoundException("Product not found");
    }
    return res;
  }

  async deleteById(id: string): Promise<Product> {
    const res = await this.productModel.findByIdAndUpdate(id,
      { $set: { status: DataStatus.INACTIVE } },
      {
        new: true,
        runValidators: true
      }).where(this.acitveCondition());
    if (!res) {
      throw new NotFoundException("Product not found");
    }
    return res;
  }

}
