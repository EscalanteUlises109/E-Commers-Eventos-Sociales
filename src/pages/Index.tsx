import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EventTypes from "@/components/EventTypes";
import Services from "@/components/Services";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <EventTypes />
        <Services />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
