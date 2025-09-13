import EventSelection from "@/components/EventSelection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const EventSelectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 font-montserrat overflow-hidden">
      <Navigation />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8">
        <EventSelection />
      </div>
      <Footer />
    </div>
  );
};

export default EventSelectionPage;