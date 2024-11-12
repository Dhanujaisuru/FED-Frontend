import Hero from "./Hero";
import Navigation from "./Navigation";
import Pagination from "./Pagination";
import Products from "./Products";
import { Slider } from "@/components/ui/slider"
import PaginationComponent from "./Pagination";


function App() {
  const name = null;
  const cartCount = 0;

  return (
    <div>
      <Navigation name={name} cartCount={cartCount} />
      <Hero />
      <Slider defaultValue={[33]} max={100} step={1} />
      <Products />
      <PaginationComponent />
    </div>
  );
}

export default App;
