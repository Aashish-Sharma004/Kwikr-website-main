import HeroSection from '@/components/home/HeroSection';
import TrustBadgesRow from '@/components/home/TrustBadgesRow';
import CategorySection from '@/components/home/CategorySection';
import FlashSaleSection from '@/components/home/FlashSaleSection';
import ProductSlider from '@/components/home/ProductSlider';
import PromoBanners from '@/components/home/PromoBanners';
import DailyEssentials from '@/components/home/DailyEssentials';
import DealsSection from '@/components/home/DealsSection';
import FreshProduceSection from '@/components/home/FreshProduceSection';
import ComboOffersSection from '@/components/home/ComboOffersSection';
import SeasonalOffersBanner from '@/components/home/SeasonalOffersBanner';
import BrandsSection from '@/components/home/BrandsSection';
import WhyKwikr from '@/components/home/WhyKwikr';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DeliveryPromise from '@/components/home/DeliveryPromise';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import MembershipBanner from '@/components/home/MembershipBanner';
import AppPromotion from '@/components/home/AppPromotion';
import DeliveryCoverageSection from '@/components/home/DeliveryCoverageSection';
import CommunitySection from '@/components/home/CommunitySection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import RecentlyViewedSection from '@/components/home/RecentlyViewedSection';
import ShopByOccasionSection from '@/components/home/ShopByOccasionSection';
import LiveDeliveryStatsSection from '@/components/home/LiveDeliveryStatsSection';
import FarmToDoorSection from '@/components/home/FarmToDoorSection';
import Reveal from '@/components/ui/Reveal';
import {
  products,
  getProductsByCategory,
  getBestSellers,
  getTrendingProducts,
  getNewArrivals,
  getTopRatedProducts,
  getOrganicProducts,
} from '@/data/products';

export default function HomePage() {
  const vegetables = products.filter(p => p.category === 'fruits-vegetables' && p.subcategory === 'vegetables');
  const fruits = products.filter(p => p.category === 'fruits-vegetables' && p.subcategory === 'fruits');
  const dairy = getProductsByCategory('dairy-milk');
  const snacks = getProductsByCategory('snacks');
  const beverages = getProductsByCategory('beverages');
  const bakery = getProductsByCategory('bakery');
  const household = getProductsByCategory('household');
  const personalCare = getProductsByCategory('personal-care');
  const bestSellers = getBestSellers();
  const trending = getTrendingProducts();
  const newArrivals = getNewArrivals();
  const topRated = getTopRatedProducts();
  const organic = getOrganicProducts();

  return (
    <>
      <HeroSection />
      <TrustBadgesRow />
      <CategorySection />

      <RecentlyViewedSection />

      <Reveal><FlashSaleSection /></Reveal>

      <Reveal>
        <ProductSlider title="Fresh Vegetables" subtitle="Straight from farms, picked daily" products={vegetables} viewAllHref="/products?category=fruits-vegetables" badge="Fresh" />
      </Reveal>
      <Reveal>
        <ProductSlider title="Fresh Fruits" subtitle="Naturally sweet, hand-picked" products={fruits} viewAllHref="/products?category=fruits-vegetables" />
      </Reveal>

      <PromoBanners />

      <Reveal>
        <ProductSlider title="Dairy Products" subtitle="Milk, curd, paneer & more" products={dairy} viewAllHref="/products?category=dairy-milk" />
      </Reveal>

      <Reveal><DailyEssentials /></Reveal>

      <Reveal>
        <ProductSlider title="Snacks & Namkeen" subtitle="Crunchy bites for every mood" products={snacks} viewAllHref="/products?category=snacks" badge="Trending" />
      </Reveal>
      <Reveal>
        <ProductSlider title="Beverages" subtitle="Juices, tea, coffee & soft drinks" products={beverages} viewAllHref="/products?category=beverages" />
      </Reveal>

      <Reveal><DealsSection /></Reveal>

      <Reveal>
        <ProductSlider title="Bakery Items" subtitle="Freshly baked, every morning" products={bakery} viewAllHref="/products?category=bakery" />
      </Reveal>
      <Reveal>
        <ProductSlider title="Household Essentials" subtitle="Keep your home spotless" products={household} viewAllHref="/products?category=household" />
      </Reveal>
      <Reveal>
        <ProductSlider title="Personal Care" subtitle="Look good, feel good" products={personalCare} viewAllHref="/products?category=personal-care" />
      </Reveal>

      <ShopByOccasionSection />

      <Reveal>
        <FreshProduceSection
          products={organic}
          title="Organic Collection"
          subtitle="Certified organic, chemical-free"
          badgeLabel="100% Organic"
          viewAllHref="/products"
        />
      </Reveal>

      <Reveal>
        <ProductSlider title="Best Sellers" subtitle="Most loved by Kwikr shoppers" products={bestSellers} viewAllHref="/products" badge="Best Seller" />
      </Reveal>
      <Reveal>
        <ProductSlider title="Trending Products" subtitle="What everyone's buying right now" products={trending} viewAllHref="/products" badge="Trending" />
      </Reveal>
      <Reveal>
        <ProductSlider title="New Arrivals" subtitle="Just landed on Kwikr" products={newArrivals} viewAllHref="/products" badge="New" />
      </Reveal>
      <Reveal>
        <ProductSlider title="Top Rated Products" subtitle="4.6★ and above, loved by customers" products={topRated} viewAllHref="/products" />
      </Reveal>

      <Reveal><ComboOffersSection /></Reveal>
      <Reveal><SeasonalOffersBanner /></Reveal>
      <Reveal><BrandsSection /></Reveal>

      <FarmToDoorSection />

      <WhyKwikr />

      <Reveal><HowItWorksSection /></Reveal>
      <Reveal><DeliveryPromise /></Reveal>

      <LiveDeliveryStatsSection />

      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><MembershipBanner /></Reveal>

      <AppPromotion />

      <Reveal><DeliveryCoverageSection /></Reveal>
      <Reveal><CommunitySection /></Reveal>
      <Reveal><FAQSection /></Reveal>
      <Reveal><NewsletterSection /></Reveal>
    </>
  );
}
