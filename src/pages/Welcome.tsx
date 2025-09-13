import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      navigate("/inicio");
    }, 800);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 font-montserrat flex items-center justify-center p-4 transition-all duration-1000 ${isAnimating ? 'scale-125 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'}`}>
      
      {/* Transition Overlay */}
      {isAnimating && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 z-50 animate-fade-in">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-white text-lg font-medium animate-pulse">Preparando tu experiencia...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Background Elements */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-1000 ${isAnimating ? 'scale-150 rotate-12 opacity-20' : 'scale-100 rotate-0 opacity-100'}`}>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-30' : 'scale-100 opacity-100'}`}>
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-pink-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-500 ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
        
        {/* Logo Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-scale-in">
            <div className="w-16 h-16 bg-gradient-to-br from-white to-pink-200 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            ¡Hola! 👋
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-4">
            Soy tu asistente de eventos. Te ayudo a encontrar el proveedor perfecto.
          </p>
          <div className="flex items-center justify-center gap-2 text-lg text-white/80">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">EventFastWeb</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={handleStart}
            disabled={isAnimating}
            className="bg-white text-purple-700 hover:bg-white/90 font-bold text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 group"
          >
            <span className="flex items-center gap-3">
              ✨ Comenzar
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isAnimating ? 'translate-x-2' : 'group-hover:translate-x-1'}`} />
            </span>
          </Button>
          
          <p className="text-white/60 text-sm mt-4">
            Tu evento perfecto está a un clic de distancia
          </p>
        </div>

        {/* Loading Animation */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;