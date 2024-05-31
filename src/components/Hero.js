import React from "react";
import { Link } from "react-router-dom";

import HeroContainer from "./HeroContainer";
import WomanImg from "../img/woman_hero.png";

//NEW TREND COMPONENT
const NewTrend = () => (
  <div className="font-semibold flex items-center uppercase">
    <span className="w-10 h-[2px] bg-red-500 mr-3"></span>
    New Trend
  </div>
);

const HeroText = () => (
  <div className="flex flex-col justify-center">
    <NewTrend />
    <h1 className="text-[70px] leading-[1.1] font-light mb-4">
      AUTUMN SALE STYLISH <br />
      <span className="font-semibold">WOMENS</span>
    </h1>
    <Link to={"/"} className="self-start uppercase font-semibold border-b-2 border-primary">
      Discover More
    </Link>
  </div>
);

const Hero = () => (
  <HeroContainer>
    <HeroText />
    <div className="hidden lg:block">
      <img src={WomanImg} alt="Asian woman standing with flowers" />
    </div>
  </HeroContainer>
);

export default Hero;
