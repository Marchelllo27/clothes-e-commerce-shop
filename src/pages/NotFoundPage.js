import HeroContainer from "../components/HeroContainer";

const NotFoundPage = ({ providedText }) => {
  const defaultText = "Oops! It seems the page you're looking for doesn't exist.";

  return (
    <HeroContainer className="my-2">
      <div className="flex justify-center items-center text-2xl font-semibold">{providedText || defaultText}</div>
    </HeroContainer>
  );
};
export default NotFoundPage;
