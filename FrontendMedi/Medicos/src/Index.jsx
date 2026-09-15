import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import AboutDeveloper from "./components/AboutDeveloper";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const Index = () => {

  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <WhyUs />
        <Services />
        <AboutDeveloper />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
};

export default Index;