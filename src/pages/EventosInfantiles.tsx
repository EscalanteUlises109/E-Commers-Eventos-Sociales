import Navigation from "@/components/Navigation";
import EventTypes from "@/components/EventTypes";
import Footer from "@/components/Footer";

const EventosInfantiles = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <EventTypes />
      </main>
      <Footer />
    </div>
  );
};

export default EventosInfantiles;