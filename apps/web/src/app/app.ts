import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { NxWelcome } from './nx-welcome';
import { ProductStore } from './store/product.store';

@Component({
  imports: [NxWelcome, RouterModule, JsonPipe],
  selector: 'app-root',
  template: `
    <app-nx-welcome></app-nx-welcome>
    <router-outlet></router-outlet>

    <div
      style="padding: 20px; margin-top: 20px; border-top: 2px solid #ccc; max-width: 800px; margin-left: auto; margin-right: auto; font-family: monospace;"
    >
      <h2>🛒 ProductStore JSON Çıktısı (Canlı)</h2>

      <p><strong>Yükleniyor mu?:</strong> {{ store.isLoading() }}</p>
      <p><strong>Hata durumu:</strong> {{ store.error() | json }}</p>

      <h3>Ürünler:</h3>
      <pre
        style="background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; overflow-x: auto;"
        >{{ store.filteredProducts() | json }}
  </pre>
    </div>
  `,
})
export class App {
  protected title = 'web';
  store = inject(ProductStore);
}
