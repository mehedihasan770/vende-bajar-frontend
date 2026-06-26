export interface ProductFormData {
  name: string;
  category: string;
  subCategory?: string;
  brand: string;
  tags: string;
  shortDescription?: string;
  description: string;
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  saleStartDate?: string;
  saleEndDate?: string;
  stock: number;
  sku: string;
  thumbnail: string;
  videoUrl?: string;
  images: string[];
  specifications?: Record<string, string>;
  inventory: {
    lowStockThreshold: number;
    allowBackorder: boolean;
  };
  shipping: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  isFeatured: boolean;
  isFlashSale: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export type ProductFormValues = Omit<
  ProductFormData,
  "images" | "specifications"
> & {
  images: { url: string }[];
  specifications: { key: string; value: string }[];
};
