import CategorySection from "./components/CategorySection/CategorySection";
import FeaturedProducts from "./components/FeaturedProductsSection/FeaturedProducts";
import FlashSale from "./components/FlashSaleSection/FlashSale";
import HeroSlider from "./components/heroSection/HeroSlider";

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
