import "./Hero.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router";

function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [highlightedFeature, setHighlightedFeature] = useState(0);

  const features = [
    "Premium Quality Products",
    "Fast Worldwide Shipping",
    "30-Day Money Back Guarantee"
  ];

  useEffect(() => {
    setIsVisible(true);
    const featureInterval = setInterval(() => {
      setHighlightedFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(featureInterval);
  }, []);

  return (
    <section className="hero-section px-4 py-4 ml-20 mr-20 overflow-hidden">
      <div className="hero-container grid grid-cols-2 rounded-2xl min-h-[50vh] bg-[#f4f8f9]">
        <div className="hero-content flex flex-col justify-center p-8 gap-4 rounded-l-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              <Star size={14} className="mr-1 text-amber-500" />
              EXCLUSIVE COLLECTION
            </span>
            <span className="h-px w-12 bg-gray-300"></span>
            <span className="text-sm text-gray-500">Spring 2025</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
            Elevate Your Style <span className="text-blue-600">Experience</span>
          </h1>

          <div className="relative h-8 overflow-hidden">
            {features.map((feature, index) => (
              <p
                key={index}
                className={`absolute transition-all duration-500 text-gray-600 ${index === highlightedFeature
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
                  }`}
              >
                {feature}
              </p>
            ))}
          </div>

          <p className="text-gray-600 max-w-md">
            Discover our curated selection of premium products designed to enhance your everyday life with exceptional quality and timeless elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button className="text-white px-6 py-4 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-200 transition-all">
              <ShoppingBag size={18} />
              <Link to="/shop">
                Shop Collection
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white`}
                  style={{ backgroundColor: `rgb(${240 - num * 40}, ${240 - num * 40}, ${240 - num * 40})` }}
                >
                  {num}K
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">10K+</span> happy customers this month
            </p>
          </div>
        </div>

        <div className="hero-image-container relative rounded-r-3xl overflow-hidden">
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