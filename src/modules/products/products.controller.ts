import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-poduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) productData: ProductDto) {
    return this.productsService.create(productData);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() productData: any) {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
