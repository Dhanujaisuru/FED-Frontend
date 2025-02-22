import Hero from "./components/Hero"
import Products from "./components/Products"
import PaginationComponent from "./components/Pagination";

function HomePage() {
  return (
    <main>
      <Hero />
      <Products />
      {/* <PaginationComponent /> */}
    </main>
  );
}

export default HomePage;