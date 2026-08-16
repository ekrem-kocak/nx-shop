import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * GraphQL Sorgusu (Query)
 * Backend'deki 'products' metodunu çağırıp, dönen alanları belirtiyoruz.
 * GQL sorgularını bileşenlerden veya store'lardan ayrı tutmak Clean Architecture'ın bir gereğidir.
 */
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      image
      stripePriceId
      isFeatured
      createdAt
      updatedAt
    }
  }
`;

/**
 * Ürün Veri Erişim Servisi (Data Access Service)
 * Görevi SADECE backend'e gidip veriyi almaktır. 
 * Elde edilen veriyi ne yapacağı ile ilgilenmez (bunu Store yönetir).
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  // Apollo servisini (GraphQL istemcisini) DI (Dependency Injection) ile alıyoruz
  private apollo = inject(Apollo);

  /**
   * Tüm ürünleri backend'den çeker.
   * @returns Product[] (Ürün listesi) dönen bir Observable
   */
  getAll(): Observable<Product[]> {
    return this.apollo
      .query<{ products: Product[] }>({
        query: GET_PRODUCTS,
        // network-only: Her çağrıldığında cache'i yoksayarak doğrudan ağdan güncel veriyi çeker
        fetchPolicy: 'network-only', 
      })
      // Gelen karmaşık GraphQL yanıtının içinden sadece 'products' dizisini ayıklıyoruz
      // Eğer data yoksa varsayılan olarak boş dizi ([]) dönüyoruz.
      .pipe(map((result) => result.data?.products ?? []));
  }
}
