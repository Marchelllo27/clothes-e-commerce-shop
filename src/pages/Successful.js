import ConfettiExplosion from "react-confetti-explosion";

import HeroContainer from "../components/HeroContainer";
import WomanImg from "../img/woman_hero.png";
import { CartContext } from "../contexts/CartContext";
import { useContext, useEffect } from "react";

const Successful = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => clearCart(), [clearCart]);

  return (
    <>
      <HeroContainer className="!p-0 h-screen">
        <div className="flex flex-col items-center justify-center">
          <ConfettiExplosion />
          <h1 className="font-medium text-4xl mb-2">Congratulations!</h1>
          <p className="font-semibold text-2xl">Successful Payment</p>
        </div>
        <div className="hidden lg:block max-h-screen">
          <img src={WomanImg} alt="Asian woman standing with flowers" className="h-full" />
        </div>
      </HeroContainer>
    </>
  );
};
export default Successful;
