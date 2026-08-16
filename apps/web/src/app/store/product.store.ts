import { inject, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { ProductService } from '../services/product.service';

/**
 * Modern (Angular 19/22) Ürün Durum Yönetimi (State Management)
 * rxResource ve SignalStore'un mükemmel uyumu.
 * Sıfır RxJS (switchMap, catchError yok), sıfır manuel loading state.
 */
export const ProductStore = signalStore(
  { providedIn: 'root' },

  // 1. UI ve Kullanıcı Tercihleri (Local State)
  withState({
    searchTerm: '',
    viewMode: 'grid',
  }),

  // 2. rxResource ile Otonom Veri Çekme (Modern Yaklaşım)
  withComputed((store, productService = inject(ProductService)) => {
    
    // rxResource kendi kendine (component yaratıldığında) API'yi çağırır.
    // İptal (cancelation), loading, error durumlarını sıfır kodla kendi yönetir.
    const productsResource = rxResource({
      stream: () => productService.getAll() // Servisi kullanıyoruz (Clean Architecture)
    });

    return {
      // Resource'un otomatik ürettiği sinyalleri Store'a bağlıyoruz
      products: productsResource.value,
      isLoading: productsResource.isLoading,
      error: productsResource.error,
      
      // Client-Side arama (Türetilmiş state)
      filteredProducts: computed(() => {
        const data = productsResource.value() ?? [];
        const term = store.searchTerm().toLowerCase().trim();
        return term ? data.filter(p => p.name.toLowerCase().includes(term)) : data;
      }),

      // Örnek: Sadece öne çıkan (featured) ürünleri filtrele
      featuredProducts: computed(() => {
        const data = productsResource.value() ?? [];
        return data.filter((p) => p.isFeatured);
      })
    };
  }),

  // 3. Olaylar (Actions)
  withMethods((store) => ({
    updateSearch(term: string) {
      patchState(store, { searchTerm: term });
    },

    toggleViewMode() {
      const mode = store.viewMode() === 'grid' ? 'list' : 'grid';
      patchState(store, { viewMode: mode });
    }
  }))
);
