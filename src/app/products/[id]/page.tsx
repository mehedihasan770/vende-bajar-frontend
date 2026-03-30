import ProductDetailsUI from "@/components/productDetails/ProductDetails";
import { publicAxios } from "@/lib/axios";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const { id } = await params;
  try {
    const { data } = await publicAxios.get(`/products/${id}`);
    return { title: data.name, description: data.shortDescription };
  } catch {
    return { title: "Products | Vende Bajar" };
  }
};

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ProductDetailsUI id={id} />;
};

export default ProductDetailsPage;