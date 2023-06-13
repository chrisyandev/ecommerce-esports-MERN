import React from "react";
import {
  HomePageHero,
  FeaturedProducts,
  OurServices,
  ContactUs,
} from "../components";

const HomePage = () => {
  return (
    <main>
      <HomePageHero />
      <FeaturedProducts />
      <OurServices />
      <ContactUs />
    </main>
  );
};

export default HomePage;
