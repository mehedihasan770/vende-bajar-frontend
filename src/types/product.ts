export interface ProductFormData {
  name: string;
  category: string;
  subCategory?: string;
  brand: string;
  tags: string;
  shortDescription?: string;
  description: string;
  sku: string;
  thumbnail: string;
  videoUrl?: string;
  pricing: {
    basePrice: number;
    salePrice?: number;
    saleType?: "flash" | "regular";
    regularPrice?: number;
    costPrice?: number;
    saleStartDate?: string;
    saleEndDate?: string;
  };
  inventory: {
    stock: number;
    lowStockThreshold: number;
    isOutOfStock: boolean;
    allowBackorder: boolean;
  };
  shippingClass: "standard" | "heavy" | "digital";
  directPayment: boolean;
  hasVariants: boolean;
  variants: {
    sku?: string;
    attributes: {
      color?: string;
      size?: string;
    };
    priceOverride?: number;
    stock: number;
    images: string[];
    isDefault: boolean;
  }[];
  specifications_map?: Record<string, string>;
  isFeatured: boolean;
  isFlashSale: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export type ProductFormValues = Omit<
  ProductFormData,
  "images" | "specifications_map" | "variants"
> & {
  images: { url: string }[];
  specifications: { key: string; value: string }[];
  variants: {
    sku?: string;
    attributes: {
      color?: string;
      size?: string;
    };
    priceOverride?: number;
    stock: number;
    images: { url: string }[];
    isDefault: boolean;
  }[];
};
