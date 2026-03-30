// components/product/Breadcrumb.tsx
import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';

// এই কম্পোনেন্টের নিজস্ব টাইপ
interface BreadcrumbProps {
  category: string;
  productName: string;
}

export const Breadcrumb = ({ category, productName }: BreadcrumbProps) => {
  return (
    <div className="mb-5 sm:mb-6 lg:mb-8">
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">হোম</Link>
        <HiOutlineChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-primary transition-colors">পণ্যসমূহ</Link>
        <HiOutlineChevronRight className="w-3 h-3" />
        <Link href={`/products?category=${category}`} className="hover:text-primary transition-colors">
          {category}
        </Link>
        <HiOutlineChevronRight className="w-3 h-3" />
        <span className="text-accent font-medium truncate max-w-30 sm:max-w-50">{productName}</span>
      </div>
    </div>
  );
};