// app/products/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicAxios } from '@/lib/axios';
import { Breadcrumb } from './productDetailsComponents/Breadcrumb';
import { ImageGallery } from './productDetailsComponents/ImageGallery';
import { ProductInfo } from './productDetailsComponents/ProductInfo';
import { ProductTabs } from './productDetailsComponents/ProductTabs';
import { ReviewsSection } from './productDetailsComponents/ReviewsSection';
import { RelatedProducts } from './productDetailsComponents/RelatedProducts';

// ============= টাইপ ডিফাইনেশন =============
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

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
}

// ============= স্ট্যাটিক ডাটা =============
const staticReviews: Review[] = [
  {
    id: 1,
    user: "মোঃ রহমান",
    rating: 5,
    date: "১৫ মার্চ, ২০২৬",
    comment: "প্রোডাক্টটি অসাধারণ! পারফরম্যান্স দারুণ এবং বিল্ড কোয়ালিটি প্রিমিয়াম। সবার জন্য সুপারিশ করছি।",
    helpful: 24
  },
  {
    id: 2,
    user: "সারাহ আহমেদ",
    rating: 4,
    date: "১০ মার্চ, ২০২৬",
    comment: "দারুণ প্রোডাক্ট, এক্সেলেন্ট ফিচার। ডেলিভারি দ্রুত ছিল। শুধু ব্যাটারি ব্যাকআপ আরও ভালো হতে পারতো।",
    helpful: 12
  },
  {
    id: 3,
    user: "কামাল হোসেন",
    rating: 5,
    date: "৫ মার্চ, ২০২৬",
    comment: "এই বছর করা সেরা কেনাকাটা! কোয়ালিটি টপ-নচ এবং কাস্টমার সার্ভিস খুব responsive।",
    helpful: 8
  }
];

const staticRelatedProducts: RelatedProduct[] = [
  {
    id: 1,
    name: "গেমিং মাউস প্রো",
    price: 4500,
    oldPrice: 5500,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80",
    rating: 4.5
  },
  {
    id: 2,
    name: "মেকানিক্যাল কিবোর্ড",
    price: 8500,
    oldPrice: 10000,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    rating: 4.8
  },
  {
    id: 3,
    name: "গেমিং হেডসেট",
    price: 3500,
    oldPrice: 4500,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80",
    rating: 4.3
  },
  {
    id: 4,
    name: "আরজিবি মাউস প্যাড",
    price: 1200,
    oldPrice: 1800,
    image: "https://images.unsplash.com/photo-1613141412326-c68e1b4f9ba0?w=400&q=80",
    rating: 4.6
  }
];

// ============= API ফেচ ফাংশন =============

// ============= মেইন কম্পোনেন্ট =============

interface ID {
  id: string;
}

export default function ProductDetailsPage({id} : ID) {
  
  // স্টেট
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  // React Query দিয়ে প্রোডাক্ট ডাটা ফেচ
  const { 
    data: product, 
    isLoading: productLoading, 
    error: productError 
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await publicAxios.get(`/products/${id}`)
      console.log(res.data, "hallo data")
      return res.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  // স্ট্যাটিক ডাটা
  const reviews = staticReviews;
  const relatedProducts = staticRelatedProducts;

  // লোডিং
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

  // এরর
  if (productError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-accent mb-2">প্রোডাক্ট লোড করতে সমস্যা হয়েছে</h3>
        <p className="text-gray-500">পুনরায় চেষ্টা করুন</p>
      </div>
    );
  }

  // প্রোডাক্ট না থাকলে
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-accent mb-2">প্রোডাক্টটি পাওয়া যায়নি</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-10">
      <div className="container mx-auto px-4">
        {/* ব্রেডক্রাম্ব */}
        <Breadcrumb
          category={product.category} 
          productName={product.name} 
        />

        {/* ২ কলাম লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          
          {/* ইমেজ গ্যালারি কম্পোনেন্ট */}
          <ImageGallery
            images={[product.thumbnail, ...product.images]}
            productName={product.name}
            oldPrice={product.oldPrice}
            price={product.price}
            isNewArrival={product.isNewArrival}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* প্রোডাক্ট ইনফো কম্পোনেন্ট */}
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>

        {/* ট্যাবস কম্পোনেন্ট */}
        <ProductTabs
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* রিভিউ সেকশন কম্পোনেন্ট */}
        <ReviewsSection
          productId={id}
          reviews={reviews}
          totalReviews={product.numReviews}
        />

        {/* সম্পর্কিত প্রোডাক্ট কম্পোনেন্ট */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}