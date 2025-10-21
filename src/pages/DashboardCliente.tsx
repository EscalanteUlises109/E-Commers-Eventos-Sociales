import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageCircle, Star, Clock, LogOut, User, Heart, Pencil, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEvents } from "@/contexts/EventsContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { useState } from "react";

const DashboardCliente = () => {
  const { user, logout } = useAuth();
  const { events } = useEvents();
  const { addReview, updateReview, getUserReviewForService, getServiceStats } = useReviews();

  const stats = [
    { label: "Eventos Planificados", value: "3", icon: Calendar, color: "from-rose to-gold" },
    { label: "Mensajes", value: "12", icon: MessageCircle, color: "from-blue-400 to-blue-600" },
    { label: "Favoritos", value: "8", icon: Heart, color: "from-pink-400 to-rose-500" },
    { label: "Citas Pendientes", value: "2", icon: Clock, color: "from-orange-400 to-red-500" }
  ];

  const myEvents = events.slice(0,5).map(e => ({ id: e.id, name: e.title, date: new Date().toLocaleDateString('es-MX'), status: 'Confirmado', progress: 100 }));

  const [openReview, setOpenReview] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const handleLogout = () => logout();

  const handleOpenReview = (serviceId: string) => {
    if (!user) return;
    const existing = getUserReviewForService(serviceId, user.id);
    setActiveServiceId(serviceId);
    if (existing) {
      setRatingValue(existing.rating);
      setComment(existing.comment);
      setEditingReviewId(existing.id);
    } else {
      setRatingValue(5);
      setComment("");
      setEditingReviewId(null);
    }
    setOpenReview(true);
  };

  const handleSaveReview = () => {
    if (!user || !activeServiceId) return;
    if (editingReviewId) {
      updateReview(editingReviewId, { rating: ratingValue, comment: comment.trim() });
    } else {
      addReview({ serviceId: activeServiceId, userId: user.id, userName: user.name, rating: ratingValue, comment: comment.trim() });
    }
    setOpenReview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-gold-50">
      <Navigation />
      <header className="bg-white/90 backdrop-blur-lg border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-rose to-gold rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">¡Hola, {user?.name}!</h1>
              <p className="text-sm text-elegant-gray">Panel de Cliente</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm">Inicio</Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-card hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-rose" />
                  Mis Eventos
                </div>
                <Button size="sm" variant="outline" className="text-rose border-rose/50 hover:bg-rose/5">Ver Todos</Button>
              </CardTitle>
              <CardDescription>Eventos en proceso de planificación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {myEvents.map(ev => {
                const statsEv = getServiceStats(ev.id);
                return (
                  <div key={ev.id} className="group relative">
                    <div className="bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-lg text-foreground">{ev.name}</h4>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">{ev.status}</span>
                          </div>
                          <p className="text-elegant-gray flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4" />{ev.date}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-foreground">Progreso del evento</span>
                              <span className="text-sm font-bold text-rose">{ev.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div className="bg-gradient-to-r from-rose to-gold h-3 rounded-full transition-all duration-500" style={{ width: `${ev.progress}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-elegant-gray">
                              <span>Iniciado</span><span>Completo</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Button size="sm" className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white opacity-0 group-hover:opacity-100 transition-opacity">Gestionar</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-elegant-gray">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-rose rounded-full" />
                              <span>5 proveedores</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-gold rounded-full" />
                              <span>3 pendientes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs font-medium">{statsEv.average} ({statsEv.count})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleOpenReview(ev.id)} className="h-8 w-8 p-0 text-elegant-gray hover:text-rose">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-elegant-gray hover:text-rose">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-2 border-dashed border-transparent hover:border-white/20 rounded-xl py-6">
                  <Calendar className="w-5 h-5 mr-2" />Planear Nuevo Evento
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center"><Star className="w-5 h-5 mr-2 text-gold" />Acciones Rápidas</CardTitle>
              <CardDescription>Gestiona tus eventos y servicios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/eventos-infantiles">
                <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white justify-start"><Calendar className="w-4 h-4 mr-2" />Planear Evento Infantil</Button>
              </Link>
              <Link to="/eventos-formales">
                <Button className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white justify-start"><Heart className="w-4 h-4 mr-2" />Planear Evento Formal</Button>
              </Link>
              <Link to="/eventos-corporativos">
                <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white justify-start"><MessageCircle className="w-4 h-4 mr-2" />Planear Evento Corporativo</Button>
              </Link>
              <Button variant="outline" className="w-full justify-start"><Star className="w-4 h-4 mr-2" />Ver Mis Favoritos</Button>
            </CardContent>
          </Card>
        </div>

        <Dialog open={openReview} onOpenChange={setOpenReview}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingReviewId ? 'Editar Reseña' : 'Nueva Reseña'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Calificación</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(r => (
                    <button key={r} type="button" onClick={() => setRatingValue(r)} className={`p-2 rounded-md border ${r <= ratingValue ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-400 hover:text-gray-600'} transition-colors`}>
                      <Star className={`w-4 h-4 ${r <= ratingValue ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Comentario</label>
                <Textarea rows={4} value={comment} onChange={e => setComment(e.target.value)} placeholder="Comparte tu experiencia..." />
              </div>
            </div>
            <DialogFooter className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setOpenReview(false)} className="flex items-center gap-2"><X className="w-4 h-4" /> Cancelar</Button>
              <Button onClick={handleSaveReview} disabled={!comment.trim()}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default DashboardCliente;