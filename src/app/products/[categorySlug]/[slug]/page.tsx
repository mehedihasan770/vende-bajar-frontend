import ProductDetailsUI from "@/components/productDetails/ProductDetails";
import { publicAxios } from "@/lib/axios";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: Promise<{ categorySlug: string; slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const res = await publicAxios.get(`/products/s/${slug}`);
    const product = res.data.data;

    if (!product) return { title: "Product Not Found | Vende Bajar" };

    const title = product.metaTitle || product.name;
    const description = product.metaDescription || product.shortDescription;

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: [product.thumbnail],
      }
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: "Products | Vende Bajar" };
  }
};

const ProductDetailsPage = async ({ params }: { params: Promise<{ categorySlug: string; slug: string }> }) => {
  const { slug } = await params;
  return <ProductDetailsUI slug={slug} />;
};

export default ProductDetailsPage;