import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionOption {
  text: string;
  value: string;
}

interface ChatQuestion {
  id: string;
  text: string;
  options: QuestionOption[];
}

const EventChatbot = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);

  const questions: ChatQuestion[] = [
    {
      id: "occasion",
      text: "¿Para qué ocasión necesitas el evento?",
      options: [
        { text: "Cumpleaños de niño/a", value: "kids_birthday" },
        { text: "Boda o XV años", value: "wedding" },
        { text: "Reunión de trabajo", value: "business" },
        { text: "Celebración familiar", value: "family" }
      ]
    },
    {
      id: "size",
      text: "¿Aproximadamente cuántas personas asistirán?",
      options: [
        { text: "Menos de 20 personas", value: "small" },
        { text: "20 - 50 personas", value: "medium" },
        { text: "50 - 100 personas", value: "large" },
        { text: "Más de 100 personas", value: "xlarge" }
      ]
    },
    {
      id: "style",
      text: "¿Qué tipo de ambiente buscas?",
      options: [
        { text: "Divertido y colorido", value: "fun" },
        { text: "Elegante y sofisticado", value: "elegant" },
        { text: "Profesional y serio", value: "professional" },
        { text: "Casual y relajado", value: "casual" }
      ]
    }
  ];

  const handleAnswer = (option: QuestionOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...userAnswers, [currentQuestion.id]: option.value };
    setUserAnswers(newAnswers);
    setShowQuestion(false);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowQuestion(true);
      } else {
        setIsComplete(true);
      }
    }, 500);
  };

  const getRecommendation = () => {
    const { occasion, style } = userAnswers;

    if (occasion === "kids_birthday" || (style === "fun" && occasion === "family")) {
      return {
        message: "¡Perfecto! Te recomiendo nuestros Eventos Infantiles con animación, decoración temática y diversión garantizada.",
        route: "/eventos-infantiles",
        type: "infantiles"
      };
    } else if (occasion === "wedding" || style === "elegant") {
      return {
        message: "Excelente elección. Nuestros Eventos Formales ofrecen elegancia, coordinación completa y momentos inolvidables.",
        route: "/eventos-formales", 
        type: "formales"
      };
    } else if (occasion === "business" || style === "professional") {
      return {
        message: "Perfecto para tu negocio. Eventos Corporativos con tecnología AV y logística profesional.",
        route: "/eventos-corporativos",
        type: "corporativos"
      };
    } else {
      return {
        message: "Basándome en tus respuestas, nuestros Eventos Formales son ideales para lo que buscas.",
        route: "/eventos-formales",
        type: "formales"
      };
    }
  };

  const handleExploreRecommendation = () => {
    const recommendation = getRecommendation();
    navigate(recommendation.route);
  };

  const restartChat = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsComplete(false);
    setShowQuestion(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenidos</h1>
          <p className="text-white/80 text-lg">Te ayudamos a encontrar tu evento ideal</p>
        </div>

        {!isComplete ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm">Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
                <span className="text-white/80 text-sm">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            {showQuestion && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  {currentQuestion.text}
                </h2>

                {/* Options Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl h-auto p-6 text-left justify-start transition-all duration-300 hover:scale-105"
                      onClick={() => handleAnswer(option)}
                    >
                      <span className="text-base font-medium">{option.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Recommendation */
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">¡Recomendación Lista!</h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                {getRecommendation().message}
              </p>
              
              <div className="space-y-4">
                <Button
                  className="w-full md:w-auto bg-white text-purple-700 hover:bg-white/90 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg text-lg"
                  onClick={handleExploreRecommendation}
                >
                  <span className="flex items-center justify-center gap-2">
                    Explorar Recomendación
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full md:w-auto text-white border border-white/20 hover:bg-white/10 rounded-2xl py-4 px-8 transition-all duration-300 ml-0 md:ml-4"
                  onClick={restartChat}
                >
                  <span className="flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Empezar de Nuevo
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventChatbot;