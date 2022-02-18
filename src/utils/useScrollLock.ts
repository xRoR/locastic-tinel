import { useEffect, useState } from 'react';

const useScrollLock = (locked: boolean, initiator: string) => {
  const [lockerer, setLockerer] = useState<string>()
  useEffect(() => {
    if (!locked && (lockerer !== initiator)) return;
    setLockerer(initiator);

    if (locked) {
      /** html */
      document.documentElement.style.setProperty('overflow', 'hidden');
      document.documentElement.style.setProperty('height', 'calc(var(--vp-height) - 1px)');
      document.documentElement.style.setProperty('box-sizing', 'border-box');
      /** body */
      document.body.style.setProperty('overflow', 'hidden');
      document.body.style.setProperty('height', 'calc(var(--vp-height) - 1px)');
      document.body.style.setProperty('box-sizing', 'border-box');
      document.body.style.setProperty('padding-right', '15px');
    } else {
      /** html */
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('height');
      document.documentElement.style.removeProperty('box-sizing');
      /** body */
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('box-sizing');
      document.body.style.removeProperty('padding-right');
    }

    return function cleanup() {
        document.body.style.cssText = ``;
        document.documentElement.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('height');
        document.documentElement.style.removeProperty('box-sizing');
    };
  }, [locked, initiator, lockerer]);
};

export default useScrollLock;
