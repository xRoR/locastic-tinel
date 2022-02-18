import React, { useEffect, useState, createContext, useContext } from 'react';

type WindowWidthContextProps = {
  isMobile: boolean;
  width: number;
} 

type WindowWidthProviderProps = {
  threshold?: number;
} 

const WindowWidthContext = createContext<WindowWidthContextProps>({
  isMobile: window?.innerWidth <= 786, width: window?.innerWidth
})

export const WindowWidthProvider: React.FC<WindowWidthProviderProps> = ({children, threshold = 786}) => {
  const [width, setWidth] = useState(window?.innerWidth || 1024);
  
  const handleChange = () => {
    document.documentElement.style.setProperty(
      "--vp-height",
      `${window.innerHeight}px`
    );
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChange);
    handleChange();
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);
  
  return <WindowWidthContext.Provider value={{ isMobile: width <= threshold, width }}>{children}</WindowWidthContext.Provider>
}

const useWindowWidth = () => useContext(WindowWidthContext)

export default useWindowWidth;
