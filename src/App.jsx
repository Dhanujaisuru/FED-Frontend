import Hero from "./Hero";
import Navigation from "./Navigation";
import Products from "./Products";
import PaginationComponent from "./Pagination";


function App() {
  const name = null;
  const cartCount = 0;

  return (
    <div>
      <Navigation name={name} cartCount={cartCount} />
      <Hero />
      <Products />
      <PaginationComponent />
    </div>
  );
};

export default App;
