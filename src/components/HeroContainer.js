const HeroContainer = ({ children, className }) => {
  return (
    <section className={`h-[800px] bg-hero bg-no-repeat bg-center py-24 ${className}`}>
      <div className="container mx-auto flex justify-around h-full">{children}</div>
    </section>
  );
};
export default HeroContainer;
