// app/products/[id]/page.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "@/lib/axios";
import { Breadcrumb } from "./productDetailsComponents/Breadcrumb";
import { ImageGallery } from "./productDetailsComponents/ImageGallery";
import { ProductInfo } from "./productDetailsComponents/ProductInfo";
import { ProductTabs } from "./productDetailsComponents/ProductTabs";
import { ReviewsSection } from "./productDetailsComponents/ReviewsSection";
import { RelatedProducts } from "./productDetailsComponents/RelatedProducts";

// interface ProductSpecifications {
//   [key: string]: string | string[] | number | undefined;
// }

// interface Product {
//   _id: string;
//   vendorEmail: string;
//   name: string;
//   slug: string;
//   description: string;
//   shortDescription: string;
//   category: string;
//   subCategory: string;
//   brand: string;
//   price: number;
//   oldPrice: number;
//   discountPercentage: number;
//   costPrice: number;
//   stock: number;
//   sku: string;
//   thumbnail: string;
//   images: string[];
//   videoUrl?: string;
//   specifications: ProductSpecifications;
//   isFeatured: boolean;
//   isFlashSale: boolean;
//   isNewArrival: boolean;
//   isBestSeller: boolean;
//   status: string;
//   rating: number;
//   numReviews: number;
//   metaTitle: string;
//   metaDescription: string;
//   createdAt?: string;
// }

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
}

const staticRelatedProducts: RelatedProduct[] = [
  {
    id: 1,
    name: "গেমিং মাউস প্রো",
    price: 4500,
    oldPrice: 5500,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80",
    rating: 4.5,
  },
  {
    id: 2,
    name: "মেকানিক্যাল কিবোর্ড",
    price: 8500,
    oldPrice: 10000,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    rating: 4.8,
  },
  {
    id: 3,
    name: "গেমিং হেডসেট",
    price: 3500,
    oldPrice: 4500,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80",
    rating: 4.3,
  },
  {
    id: 4,
    name: "আরজিবি মাউস প্যাড",
    price: 1200,
    oldPrice: 1800,
    image:
      "https://images.unsplash.com/photo-1613141412326-c68e1b4f9ba0?w=400&q=80",
    rating: 4.6,
  },
];

interface ID {
  id: string;
}

export default function ProductDetailsPage({ id }: ID) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState<"description" | "specifications">(
    "description",
  );

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await publicAxios.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const relatedProducts = staticRelatedProducts;

  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin absolute top-0"></div>
        </div>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <div className="text-gray-400 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-accent mb-2">
          Something went wrong
        </h3>
        <p className="text-sm text-gray-500">
          Could not load product. Please try again.
        </p>
      </div>
    );
  }

  const productData = product?.data; // Extracting the 'data' from API response

  if (!productData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-accent mb-2">
          Products Not Found
        </h3>
      </div>
    );
  }

  const allImages =
    productData.images?.length > 0
      ? productData.images
      : [productData.thumbnail];

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-10">
      <div>
        <Breadcrumb
          category={productData.category}
          productName={productData.name}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-10">
          <ImageGallery
            images={allImages}
            productName={productData.name}
            oldPrice={productData.basePrice}
            price={productData.salePrice || productData.basePrice}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <ProductInfo
            product={productData}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>

        <ProductTabs
          product={productData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <ReviewsSection productId={id} />

        {/* সম্পর্কিত প্রোডাক্ট কম্পোনেন্ট */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
