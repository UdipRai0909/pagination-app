import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json));
    })();
  }, [url]);
  return data;
};

export default useFetch;
