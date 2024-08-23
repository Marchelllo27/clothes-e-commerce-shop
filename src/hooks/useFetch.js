import { useState, useCallback, useRef, useMemo } from "react";

const useFetch = url => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const controllerRef = useRef();
  controllerRef.current = useMemo(() => new AbortController(), []);

  const startFetching = useCallback(
    async (options = {}) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(url, { ...options, signal: controllerRef.current.signal });
        if (!response.ok) throw new Error("An error occurred while fetching");

        const parsedData = await response.json();

        setData(parsedData);
      } catch (error) {
        //might be something in error.response
        setError(error.message || "An error occurred while fetching");
      }

      //set loading false whether fetching successfull or not..
      setIsLoading(false);

      controllerRef.current = null; //clear controller
    },
    [url]
  );

  return [{ isLoading, error, data, controller: controllerRef.current }, startFetching];
};

export default useFetch;

// How to use in component

// import useFetch from ""...."
// const [{ isLoading, error, data }, startFetching] = useFetch("http://some-url");

//   useEffect(() => {
//     startFetching(options);   options are optional {method: "POST", data: "", headers: {}}
//   }, [startFetching]);

//   return (
//     <>
//       {isLoading && <p>Loading...</p>}
//       {data && <p>Data was fetched!</p>}
//       {error && <small>{error}</small>}
//     </>
