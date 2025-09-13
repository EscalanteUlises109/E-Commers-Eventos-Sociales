import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bot, User, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<ChatQuestion | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions: ChatQuestion[] = [
    {
      id: "occasion",
      text: "¡Hola! ¿Para qué ocasión necesitas el evento?",
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Inicializar con el primer mensaje y pregunta
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: "¡Hola! Soy tu asistente para eventos. Te ayudaré a encontrar el tipo de evento perfecto para ti.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
      setTimeout(() => {
        setCurrentQuestion(questions[0]);
        const firstQuestion: Message = {
          id: "question-0",
          text: questions[0].text,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, firstQuestion]);
      }, 1000);
    }
  }, []);

  const handleAnswer = (option: QuestionOption) => {
    // Agregar respuesta del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: option.text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Guardar respuesta
    if (currentQuestion) {
      const newAnswers = { ...userAnswers, [currentQuestion.id]: option.value };
      setUserAnswers(newAnswers);

      // Determinar siguiente pregunta
      const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
      
      if (currentIndex < questions.length - 1) {
        // Hay más preguntas
        setTimeout(() => {
          const nextQuestion = questions[currentIndex + 1];
          setCurrentQuestion(nextQuestion);
          
          const botMessage: Message = {
            id: `question-${currentIndex + 1}`,
            text: nextQuestion.text,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
      } else {
        // Todas las preguntas respondidas, generar recomendación
        setTimeout(() => {
          const recommendation = getRecommendation(newAnswers);
          const recommendationMessage: Message = {
            id: 'recommendation',
            text: recommendation.message,
            sender: 'bot',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, recommendationMessage]);
          setCurrentQuestion(null);
          setIsComplete(true);
        }, 1000);
      }
    }
  };

  const getRecommendation = (answers: Record<string, string>) => {
    const { occasion, size, style } = answers;

    // Lógica simple para recomendar tipo de evento
    if (occasion === "kids_birthday" || (style === "fun" && occasion === "family")) {
      return {
        message: "¡Perfecto! Te recomiendo explorar nuestros Eventos Infantiles. Tenemos animación, decoración temática y todo lo necesario para hacer una celebración mágica.",
        route: "/eventos-infantiles",
        type: "infantiles"
      };
    } else if (occasion === "wedding" || style === "elegant") {
      return {
        message: "Excelente elección. Nuestros Eventos Formales son perfectos para ti. Ofrecemos ceremonias elegantes, fotografía profesional y coordinación completa.",
        route: "/eventos-formales", 
        type: "formales"
      };
    } else if (occasion === "business" || style === "professional") {
      return {
        message: "Ideal para tu negocio. Te sugiero nuestros Eventos Corporativos con tecnología AV, logística profesional y networking premium.",
        route: "/eventos-corporativos",
        type: "corporativos"
      };
    } else {
      return {
        message: "Basándome en tus respuestas, creo que nuestros Eventos Formales se adaptan mejor a lo que buscas. ¡Échales un vistazo!",
        route: "/eventos-formales",
        type: "formales"
      };
    }
  };

  const handleExploreRecommendation = () => {
    const recommendation = getRecommendation(userAnswers);
    navigate(recommendation.route);
  };

  const restartChat = () => {
    setMessages([]);
    setCurrentQuestion(null);
    setUserAnswers({});
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Messages Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Asistente de Eventos</h2>
            <p className="text-white/80 text-sm">Te ayudo a encontrar tu evento ideal</p>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex animate-fade-in ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-3 rounded-2xl shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-white text-purple-800 rounded-br-md'
                    : 'bg-white/20 text-white rounded-bl-md'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Options or Actions */}
          {currentQuestion && (
            <div className="space-y-3 animate-fade-in">
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl h-auto p-4 text-left justify-start transition-all duration-300 hover:scale-105"
                    onClick={() => handleAnswer(option)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {isComplete && (
            <div className="space-y-4 animate-fade-in">
              <Button
                className="w-full bg-white text-purple-700 hover:bg-white/90 font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={handleExploreRecommendation}
              >
                <span className="flex items-center justify-center gap-2">
                  Explorar Recomendación
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full text-white border border-white/20 hover:bg-white/10 rounded-2xl py-4 transition-all duration-300"
                onClick={restartChat}
              >
                <span className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Empezar de Nuevo
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventChatbot;