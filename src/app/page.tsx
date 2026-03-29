import CategorySection from "@/components/home/CategorySection/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProductsSection/FeaturedProducts";
import FlashSale from "@/components/home/FlashSaleSection/FlashSale";
import HeroSlider from "@/components/home/heroSection/HeroSlider";

export default function Home() {


  return (
    <>
      {/* main content */}
      <main>
          <section>
            <HeroSlider/>
          </section>
          <section>
            <FlashSale/>
          </section>
          <section>
            <FeaturedProducts/>
          </section>
          <section>
            <CategorySection/>
          </section>
      </main>
    </>
  );
}
