import { useEffect } from 'react';

const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    locked ? document.body.style.cssText = `
        overflow: hidden;
        padding-right: 15px;
    ` : document.body.style.cssText = ``;
    return function cleanup() {
        document.body.style.cssText = ``;
    };
  }, [locked]);

  return { locked };
};

export default useScrollLock;
