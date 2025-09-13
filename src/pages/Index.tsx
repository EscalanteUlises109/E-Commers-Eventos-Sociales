import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EventSelection from "@/components/EventSelection";
import Services from "@/components/Services";
import ServiceProviders from "@/components/ServiceProviders";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <EventSelection />
        <Services />
        <ServiceProviders />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
