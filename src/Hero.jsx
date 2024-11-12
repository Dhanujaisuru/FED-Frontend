import "./Hero.css";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="hero-section px-8 py-8 ml-16 mr-16">
      <div className="hero-container grid grid-cols-2 rounded-lg min-h-[60vh] bg-[#f4f8f9]">
        <div className="hero-content flex flex-col justify-center p-16 gap-4">
          <span className="discount-badge inline-block rounded-full px-2 py-1 text-xs w-fit bg-[#febc26]">WEEKLY DISCOUNT</span>
          <h1 className="hero-title text-6xl font-semibold leading-none">Premium Product Online Shop</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
            suscipit est autem quia? Voluptatem?
          </p>
          <Button className="w-fit" asChild>
            <a to="/shop">Shop Now</a>
          </Button>
        </div>
        <div className="hero-image-container relative">
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt=""
            className="hero-image w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
