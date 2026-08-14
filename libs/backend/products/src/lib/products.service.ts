import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nx-shop/data-access-db';
import { Product } from '@nx-shop/prisma-client';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  findOne(id: string) {
    return this.prismaService.product.findFirst({ where: { id } });
  }

  search(term: string): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
        ],
      },
    });
  }
}
