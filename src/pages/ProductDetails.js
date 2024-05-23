import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

const ProductDetails = () => {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const productData = products.find(product => product.id === +id);

  if (!productData) {
    return <section className="h-screen flex justify-center items-center">Loading...</section>;
  }

  const { title, price, description, image } = productData;

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img src={image} alt={title} className="max-w-[200px] lg:max-w-sm" />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
            <div className="text-xl text-red-500 font-medium mb-6">$ {parseFloat(price).toFixed(2)}</div>
            <p className="mb-8">{description}</p>
            <button className="bg-primary py-4 px-8 text-white" onClick={() => addToCart(productData, productData.id)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
