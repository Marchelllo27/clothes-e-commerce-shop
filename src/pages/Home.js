import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  const { products, isLoading, error } = useContext(ProductContext);

  const showSkeletonLoading = isLoading && products.length <= 0;
  const showErrorMessage = (!isLoading && products.length <= 0) || error;

  //Error message if we can't load the products.
  const errorMessage = (
    <p className="text-red-600 text-lg">Unfortunately, we can't load the products. Please try again later.</p>
  );

  const productsComponent = (
    <ul
      className={`${
        showSkeletonLoading || products.length > 0
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0"
          : "flex justify-center items-center"
      }`}
    >
      {showSkeletonLoading
        ? Array.from(new Array(10)).map((item, index) => <Product key={index} skeleton product={{}} />)
        : showErrorMessage
        ? errorMessage
        : products.map(product => <Product key={product.id} product={product} />)}
    </ul>
  );

  return (
    <>
      <Hero />
      <section className="py-16" id="products-section">
        <div className="container mx-auto">{productsComponent}</div>
      </section>
    </>
  );
};

export default Home;
