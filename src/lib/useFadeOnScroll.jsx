import { useState, useRef, useEffect, useCallback } from 'react';

const useFadeOnScroll = (threshold = 20) => {
  const [fadeVisible, setFadeVisible] = useState(true);
  const ref = useRef(null);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    
    const el = ref.current;
    const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    setFadeVisible(!isEnd);
  }, [threshold]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { fadeVisible, ref };
};

export default useFadeOnScroll;