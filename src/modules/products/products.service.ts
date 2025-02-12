import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../../entities/Product';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    product.createdAt = new Date();
    product.updatedAt = new Date();
    return this.productRepository.save(product);
  }
  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    data.updatedAt = new Date();
    await this.productRepository.update(id, data);
    return this.productRepository.findOneBy({ id });
  }
  async delete(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    await this.productRepository.delete(id);
    return product;
  }
}
