import { useState } from "react";

export const useLoading = () => {
  const [loadBtn, setLoadBtn] = useState(false);

  const handleLoadBtn = () => {
    setLoadBtn(true);
    setTimeout(() => setLoadBtn(false), 1000);
  };

  return { loadBtn, handleLoadBtn };
};
