import Hero from "./../Hero"
import Navigation from "./../Navigation"
import Products from "./../Products"
import PaginationComponent from "./../Pagination";

function HomePage() {
    const name = null
    const cartCount = 2;
  
    return (
      <div>
        <Navigation name={name} cartCount={cartCount} />
        <Hero />
        <Products />
        <PaginationComponent />
      </div>
    );
  }
  
  export default HomePage;