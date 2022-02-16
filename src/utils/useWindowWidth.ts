import { useEffect, useState } from 'react';

const useWindowWidth = (threshold = 768) => {
  const [width, setWidth] = useState(window?.innerWidth || 1024);
  const handleChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return { isMobile: width <= threshold, width };
};

export default useWindowWidth;
