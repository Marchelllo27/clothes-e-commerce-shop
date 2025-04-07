import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto">
        <p className="text-white text-center">Copyright &copy; E-commerce Shop {currentYear}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
