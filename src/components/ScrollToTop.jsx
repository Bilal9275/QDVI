// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const offset = 50; // Adjust this value to your desired offset

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Scroll to the section if there's a hash
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset; // Calculate the position with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth', // Smooth scroll
        });
      }
    }
  }, [hash, offset]);

  return null;
};

export default ScrollToTop;