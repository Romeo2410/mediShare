import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {

  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);


  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  if (!showTopButton) {
    return null;
  }


  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-110 transition-all duration-300"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
