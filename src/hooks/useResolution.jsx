import { useState, useEffect } from "react";

const useResolution = (breakpoint = 1600) => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < breakpoint);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { isSmall };
};

export default useResolution;