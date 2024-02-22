import {
  Body,
  Controller, DefaultValuePipe,
  Get,
  HttpException,
  NotFoundException,
  Param, ParseIntPipe,
  Patch,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { HttpStatus, ResponseMessage } from "../global/global-enum";
import { ApiResponse } from "../global/api-response";

@Controller("api/product")
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Get()
  async getAllProducts(
    @Query('pageNum', new DefaultValuePipe(1), ParseIntPipe) pageNum: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    try {
      const data = await this.productService.findAll(pageNum, pageSize);
      return ApiResponse.success(data, ResponseMessage.GET_DATA_SUCCESS);
    } catch (error) {
      throw new HttpException(ApiResponse.error(ResponseMessage.SERVER_INTERNAL_ERROR), HttpStatus.ERROR);
    }
  }

  @Post("create")
  async createProduct(
    @Body()
      product: CreateProductDto
  ) {
    try {
      const { error, value } = CreateProductDto.schema.validate(product);
      if (error) {
        throw new HttpException(ApiResponse.error(error.details[0].message || ResponseMessage.SERVER_INTERNAL_ERROR), HttpStatus.ERROR);
      }
      const data = await this.productService.create(product);
      return ApiResponse.success(data, ResponseMessage.CREATE_SUCCESS);
    } catch (error) {
      throw new HttpException(ApiResponse.error(error?.message || ResponseMessage.SERVER_INTERNAL_ERROR), HttpStatus.ERROR);
    }
  }

  @Get("/:id")
  async getProduct(
    @Param("id")
      id: string
  ) {
    try {
      const data = await this.productService.findById(id);
      return ApiResponse.success(data, ResponseMessage.GET_DATA_SUCCESS);
    } catch (error) {
      throw new HttpException(ApiResponse.error(ResponseMessage.SERVER_INTERNAL_ERROR), HttpStatus.ERROR);
    }
  }

  @Patch("update/:id")
  async updateProduct(
    @Param("id")
      id: string,
    @Body()
      product: UpdateProductDto
  ) {
    try {
      const { error, value } = UpdateProductDto.schema.validate(product);
      if (error) {
        throw new HttpException(ApiResponse.error(error.details[0].message || ResponseMessage.SERVER_INTERNAL_ERROR), HttpStatus.ERROR);
      }
      const data = await this.productService.updateById(id, product);
      return ApiResponse.success(data, ResponseMessage.UPDATE_SUCCESS);
    } catch (error) {
      throw new HttpException(ApiResponse.error(error?.message || ResponseMessage.SERVER_INTERNAL_ERROR), HttpStatus.ERROR);
    }
  }

  @Patch("delete/:id")
  async deleteProduct(
    @Param("id")
      id: string
  ) {
    try {
      const data = await this.productService.deleteById(id);
      return ApiResponse.success(data, ResponseMessage.UPDATE_SUCCESS);
    } catch (error) {
      throw new HttpException(ApiResponse.error(ResponseMessage.SERVER_INTERNAL_ERROR), HttpStatus.ERROR);
    }
  }

}
