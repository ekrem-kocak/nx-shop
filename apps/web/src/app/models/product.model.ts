/**
 * Ürün (Product) Veri Modeli
 * Bu dosya, backend'den gelen ürün verisinin yapısını tanımlar.
 * Projenin her yerinde (Store, Service, Component) aynı tipi kullanmak için
 * bu interface'i merkeze alıyoruz.
 */
export interface Product {
  id: string;             // Ürünün benzersiz kimliği
  name: string;           // Ürün adı
  description: string;    // Ürün açıklaması
  price: number;          // Ürün fiyatı
  image: string;          // Ürün görselinin URL'si veya yolu
  stripePriceId: string;  // Ödeme sistemi (Stripe) fiyat kimliği
  isFeatured: boolean;    // Öne çıkan ürün mü? (Anasayfada göstermek için)
  createdAt: string;      // Oluşturulma tarihi (ISO string)
  updatedAt: string;      // Son güncellenme tarihi (ISO string)
}
