import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoadingBack = () => {
  const [backBtn, setBackBtn] = useState(false);
  const navigate = useNavigate();

  const handleBackBtn = () => {
    setBackBtn(true);
    setTimeout(() => setBackBtn(false), 1000);
    setTimeout(() => navigate("/"), 1000);
  };

  return { backBtn, handleBackBtn };
};
