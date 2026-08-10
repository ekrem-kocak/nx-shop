import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.findOne(id);
  }

  @Query(() => [Product], { name: 'searchProducts' })
  search(
    @Args('term', { type: () => String }) term: string,
  ): Promise<Product[]> {
    return this.productsService.search(term);
  }
}
