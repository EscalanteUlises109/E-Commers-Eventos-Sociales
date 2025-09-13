import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, User, ArrowRight } from "lucide-react";
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
      text: "¡Hola! Soy tu asistente para eventos. ¿Para qué ocasión necesitas el evento?",
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Asistente de Eventos</h3>
                <p className="text-white/80 text-sm">Te ayudo a encontrar el evento perfecto</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Options or Actions */}
          <div className="p-6 border-t bg-gray-50 rounded-b-lg">
            {currentQuestion && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600 mb-4">Selecciona una opción:</p>
                <div className="grid gap-2">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                      onClick={() => handleAnswer(option)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {isComplete && (
              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  onClick={handleExploreRecommendation}
                >
                  <span className="flex items-center justify-center gap-2">
                    Explorar Recomendación
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={restartChat}
                >
                  Empezar de Nuevo
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventChatbot;