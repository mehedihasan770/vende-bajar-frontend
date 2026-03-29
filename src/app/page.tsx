import CategorySection from "@/components/home/CategorySection/CategorySection";
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
            <CategorySection/>
          </section>
      </main>
    </>
  );
}
