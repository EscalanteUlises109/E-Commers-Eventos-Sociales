import Navigation from "@/components/Navigation";
import EventChatbot from "@/components/EventChatbot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <EventChatbot />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
