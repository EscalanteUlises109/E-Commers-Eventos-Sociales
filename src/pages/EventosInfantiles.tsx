import Navigation from "@/components/Navigation";
import EventSelection from "@/components/EventSelection";
import Footer from "@/components/Footer";

const EventosInfantiles = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <EventSelection />
      </main>
      <Footer />
    </div>
  );
};

export default EventosInfantiles;