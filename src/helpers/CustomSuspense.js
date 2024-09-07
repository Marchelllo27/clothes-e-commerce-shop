import { Suspense } from "react";
import Spinner from "./Spinner";

const CustomSuspense = ({ fallback, component }) => {
  return <Suspense fallback={fallback || <Spinner />}>{component}</Suspense>;
};
export default CustomSuspense;
