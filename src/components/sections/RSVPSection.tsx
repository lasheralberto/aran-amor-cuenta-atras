import { useState, useEffect } from "react";
import { Check, Mail, Loader, AlertCircle, CheckCircle2, User, AtSign, MessageSquare, Music, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("0");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [message, setMessage] = useState("");
  const [messageSong, setMessageSong] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para validación y UX
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isMobile = useIsMobile();

  // Validación en tiempo real
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};
    
    if (touched.name && !name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    
    if (touched.email && (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      newErrors.email = "Email válido requerido";
    }
    
    setErrors(newErrors);
  }, [name, email, touched]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocusedField(null);
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const isFieldValid = (field: string) => touched[field] && !errors[field] && 
    ((field === 'name' && name.trim()) || (field === 'email' && email.trim()));
  const isFieldInvalid = (field: string) => touched[field] && errors[field];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      records: [
        {
          fields: {
            Nombre: name,
            Email: email,
            Restricciones: dietaryRestrictions,
            Cancion: messageSong,
            Mensaje: message,
            // DormirEnParador: stayAtParador === "yes" ? "Sí" : "No",
            // ...(stayAtParador === "yes"
            //   ? {
            //       TipoHabitacion: paradorRoom,
            //       FechaEntrada: paradorCheckIn,
            //       FechaSalida: paradorCheckOut,
            //     }
            //   : {}),
          },
        },
      ],
    };

    try {
      // Envío a Airtable
      const airtableResponse = await fetch(
        "https://api.airtable.com/v0/appGU5yB2ZkikiTnf/tbluQQwjnh26iyhBw",
        {
          method: "POST",
          headers: {
            Authorization:
            "Bearer patkZYGQfxVNjVZQq.4203f8a5a8b89553d0f846fdb834df351dc8424ecab6e75123e79531f4f7a3fd",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const airtableResult = await airtableResponse.json();

      if (airtableResponse.ok) {
        console.log("✅ Datos enviados a Airtable:", airtableResult);
        setIsSubmitted(true);

        // Limpiar formulario
        setName("");
        setEmail("");
        setGuests("0");
        setDietaryRestrictions("");
        setMessage("");
        setMessageSong("");
        setTouched({});
        setErrors({});
        setFocusedField(null);
      } else {
        console.error("❌ Error al enviar a Airtable:", airtableResult);
        alert("Ocurrió un error al enviar los datos.");
      }
    } catch (error) {
      console.error("❌ Error de red al enviar a Airtable:", error);
      alert("Error de red. Intenta de nuevo más tarde.");
    }

    // Enviar al webhook de Make (siempre)
    try {
      const webhookResponse = await fetch(
        "https://hook.eu2.make.com/gxbuwrawiogn2uji1o3d9zi224v5paer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-make-apikey": "wedding",
          },
          body: JSON.stringify(payload),
        }
      );

      const webhookResult = await webhookResponse.json();
      if (webhookResponse.ok) {
        console.log("✅ Datos enviados al webhook de Make:", webhookResult);
      } else {
        console.error("❌ Error en webhook de Make:", webhookResult);
      }
    } catch (webhookError) {
      console.error("❌ También falló el envío al webhook de Make:", webhookError);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <section id="rsvp" className="py-12 md:py-20 lg:py-32 winter-section relative overflow-hidden">
      {/* Background elements - más sutiles */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-blue-900/20 to-purple-900/30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10 px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cursive text-white font-light mb-3 md:mb-4 tracking-wide">
            Confirmación
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed px-4">
            Tu presencia hace que este momento sea perfecto
          </p>
        </div>
        
        <div className="max-w-lg md:max-w-2xl mx-auto">
          {/* Card con mucho mejor contraste para móviles */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl backdrop-blur-xl bg-slate-800/90 md:bg-white/[0.08] border border-slate-600/50 md:border-white/20 shadow-2xl">
            {/* Overlay más oscuro para móviles, más claro para desktop */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/60 via-slate-800/40 to-slate-900/60 md:from-white/[0.12] md:via-white/[0.08] md:to-white/[0.04]"></div>
            
            {/* Content con mejor padding para móvil */}
            <div className="relative z-10 p-6 md:p-10 lg:p-12">
              {isSubmitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 mb-6 md:mb-8 shadow-lg shadow-emerald-500/25">
                    <Check className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-100 mb-4 md:mb-6 tracking-wide">
                    ¡Perfecto!
                  </h3>
                  <p className="text-base md:text-lg text-gray-200 md:text-white/90 font-light mb-6 md:mb-8 leading-relaxed max-w-sm md:max-w-md mx-auto px-4">
                    Hemos recibido tu confirmación. Estamos emocionados de celebrar contigo.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-gray-300 md:text-white/70 hover:text-white transition-colors duration-300 text-sm md:text-base font-light underline decoration-gray-400 md:decoration-white/40 hover:decoration-white underline-offset-4"
                  >
                    Enviar otra confirmación
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  {/* Header minimalista - mejor contraste para móvil */}
                  <div className="text-center mb-6 md:mb-8">
                    <p className="text-white/70 text-xs md:text-sm font-light tracking-wide uppercase">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-600/70 md:bg-white/10 backdrop-blur-sm border border-slate-500/50 md:border-white/20 mb-3 md:mb-4">
                      <Send className="h-4 w-4 md:h-5 md:w-5 text-gray-200 md:text-white/80" />
                    </div>
                    <p className="text-gray-300 md:text-white/70 text-xs md:text-sm font-light tracking-wide uppercase">
                      Completa los datos
                    </p>
                  </div>

                  {/* Nombre - mucho mejor contraste para móviles */}
                  <div className="relative group">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                        required
                        className={`w-full px-3 md:px-4 py-3 md:py-4 bg-white border border-white/30 rounded-xl text-black text-sm md:text-base font-light 
                          placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-white/50 
                          focus:bg-white backdrop-blur-sm shadow-sm
                        className={`w-full px-3 md:px-4 py-3 md:py-4 bg-slate-700/80 md:bg-white/[0.08] border-b-2 text-gray-100 md:text-white text-base md:text-lg font-light 
                          placeholder-transparent transition-all duration-300 focus:outline-none backdrop-blur-sm
                          rounded-t-lg focus:bg-slate-600/80 md:focus:bg-white/[0.12]
                          ${isFieldInvalid('name') ? 'border-red-400/80 focus:border-red-400' : 
                            isFieldValid('name') ? 'border-emerald-400/80 focus:border-emerald-400' :
                            'border-slate-500/50 md:border-white/30 focus:border-slate-400 md:focus:border-white/70'
                          }`}
                        placeholder="Nombre completo"
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-3 md:left-4 transition-all duration-300 pointer-events-none
                          ${name || focusedField === 'name' 
                            ? 'top-0 text-xs text-gray-200 md:text-white/80 transform -translate-y-4' 
                            : 'top-3 md:top-4 text-base md:text-lg text-gray-300 md:text-white/50'
                          }`}
                      >
                        Nombre completo *
                      </label>
                      <User className={`absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 transition-colors duration-300
                        ${isFieldValid('name') ? 'text-emerald-400' : 
                          isFieldInvalid('name') ? 'text-red-400' : 'text-white/60'
                          isFieldInvalid('name') ? 'text-red-400' : 'text-gray-400 md:text-white/40'
                        }`} />
                    </div>
                    <label className="text-xs md:text-sm text-white/85 font-light mt-2 block">
                      Nombre completo *
                    </label>
                    {errors.name && (
                      <p className="mt-2 text-xs md:text-sm text-red-400 flex items-center gap-2 font-light">
                        <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
                        {errors.name}
                      </p>
                    )}
                    {isFieldValid('name') && (
                      <p className="mt-2 text-xs md:text-sm text-emerald-400 flex items-center gap-2 font-light">
                        <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
                        Perfecto
                      </p>
                    )}
                  </div>

                  {/* Email - mucho mejor contraste para móviles */}
                  <div className="relative group">
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        required
                        className={`w-full px-3 md:px-4 py-3 md:py-4 bg-white border border-white/30 rounded-xl text-black text-sm md:text-base font-light 
                          placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-white/50 
                          focus:bg-white backdrop-blur-sm shadow-sm
                        className={`w-full px-3 md:px-4 py-3 md:py-4 bg-slate-700/80 md:bg-white/[0.08] border-b-2 text-gray-100 md:text-white text-base md:text-lg font-light 
                          placeholder-transparent transition-all duration-300 focus:outline-none backdrop-blur-sm
                          rounded-t-lg focus:bg-slate-600/80 md:focus:bg-white/[0.12]
                          ${isFieldInvalid('email') ? 'border-red-400/80 focus:border-red-400' : 
                            isFieldValid('email') ? 'border-emerald-400/80 focus:border-emerald-400' :
                            'border-slate-500/50 md:border-white/30 focus:border-slate-400 md:focus:border-white/70'
                          }`}
                        placeholder="Correo electrónico"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-3 md:left-4 transition-all duration-300 pointer-events-none
                          ${email || focusedField === 'email' 
                            ? 'top-0 text-xs text-gray-200 md:text-white/80 transform -translate-y-4' 
                            : 'top-3 md:top-4 text-base md:text-lg text-gray-300 md:text-white/50'
                          }`}
                      >
                        Correo electrónico *
                      </label>
                      <AtSign className={`absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 transition-colors duration-300
                        ${isFieldValid('email') ? 'text-emerald-400' : 
                          isFieldInvalid('email') ? 'text-red-400' : 'text-white/60'
                          isFieldInvalid('email') ? 'text-red-400' : 'text-gray-400 md:text-white/40'
                        }`} />
                    </div>
                    <label className="text-xs md:text-sm text-white/85 font-light mt-2 block">
                      Correo electrónico *
                    </label>
                    {errors.email && (
                      <p className="mt-2 text-xs md:text-sm text-red-400 flex items-center gap-2 font-light">
                        <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
                        {errors.email}
                      </p>
                    )}
                    {isFieldValid('email') && (
                      <p className="mt-2 text-xs md:text-sm text-emerald-400 flex items-center gap-2 font-light">
                        <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
                        Perfecto
                      </p>
                    )}
                  </div>

                  {/* Separador visual - mejor contraste */}
                  <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-400/50 md:via-white/30 to-transparent"></div>
                    <span className="text-gray-300 md:text-white/50 text-xs font-light uppercase tracking-wider">Opcional</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-400/50 md:via-white/30 to-transparent"></div>
                  </div>

                  {/* Restricciones alimentarias - mejor contraste para móviles */}
                  <div className="relative group">
                    <div className="relative">
                      <textarea
                        id="dietary"
                        value={dietaryRestrictions}
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                        onFocus={() => handleFocus('dietary')}
                        onBlur={() => setFocusedField(null)}
                        rows={3}
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-white border border-white/30 rounded-xl text-black text-sm md:text-base font-light 
                          placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-white/50 
                          focus:bg-white backdrop-blur-sm resize-none shadow-sm"
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-slate-700/70 md:bg-white/[0.10] border border-slate-500/50 md:border-white/20 rounded-xl text-gray-100 md:text-white text-sm md:text-base font-light 
                          placeholder-gray-300 md:placeholder-white/40 transition-all duration-300 focus:outline-none focus:border-slate-400 md:focus:border-white/40 
                          focus:bg-slate-600/70 md:focus:bg-white/[0.15] backdrop-blur-sm resize-none"
                        placeholder="Alergias, intolerancias, restricciones..."
                      />
                      <MessageSquare className="absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-white/50" />
                      <MessageSquare className="absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-gray-400 md:text-white/40" />
                    </div>
                    <label className="text-xs md:text-sm text-white/85 font-light mt-2 block">
                    <label className="text-xs md:text-sm text-gray-300 md:text-white/60 font-light mt-2 block">
                      Restricciones alimentarias
                    </label>
                  </div>

                  {/* Canción - mejor contraste para móviles */}
                  <div className="relative group">
                    <div className="relative">
                      <textarea
                        id="messageSong"
                        value={messageSong}
                        onChange={(e) => setMessageSong(e.target.value)}
                        onFocus={() => handleFocus('messageSong')}
                        onBlur={() => setFocusedField(null)}
                        rows={3}
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-white border border-white/30 rounded-xl text-black text-sm md:text-base font-light 
                          placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-white/50 
                          focus:bg-white backdrop-blur-sm resize-none shadow-sm"
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-slate-700/70 md:bg-white/[0.10] border border-slate-500/50 md:border-white/20 rounded-xl text-gray-100 md:text-white text-sm md:text-base font-light 
                          placeholder-gray-300 md:placeholder-white/40 transition-all duration-300 focus:outline-none focus:border-slate-400 md:focus:border-white/40 
                          focus:bg-slate-600/70 md:focus:bg-white/[0.15] backdrop-blur-sm resize-none"
                        placeholder="Tu canción para la pista de baile..."
                      />
                      <Music className="absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-white/50" />
                      <Music className="absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-gray-400 md:text-white/40" />
                    </div>
                    <label className="text-xs md:text-sm text-white/85 font-light mt-2 block">
                      Canción para la fiesta <span className="text-white/50">(sin Despacito, por favor)</span>
                    <label className="text-xs md:text-sm text-gray-300 md:text-white/60 font-light mt-2 block">
                      Canción para la fiesta <span className="text-gray-400 md:text-white/40">(sin Despacito, por favor)</span>
                    </label>
                  </div>

                  {/* Mensaje - mejor contraste para móviles */}
                  <div className="relative group">
                    <div className="relative">
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={3}
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-white border border-white/30 rounded-xl text-black text-sm md:text-base font-light 
                          placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-white/50 
                          focus:bg-white backdrop-blur-sm resize-none shadow-sm"
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-slate-700/70 md:bg-white/[0.10] border border-slate-500/50 md:border-white/20 rounded-xl text-gray-100 md:text-white text-sm md:text-base font-light 
                          placeholder-gray-300 md:placeholder-white/40 transition-all duration-300 focus:outline-none focus:border-slate-400 md:focus:border-white/40 
                          focus:bg-slate-600/70 md:focus:bg-white/[0.15] backdrop-blur-sm resize-none"
                        placeholder="Un mensaje especial para nosotros..."
                      />
                      <MessageSquare className="absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-white/50" />
                      <MessageSquare className="absolute right-3 md:right-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-gray-400 md:text-white/40" />
                    </div>
                    <label className="text-xs md:text-sm text-white/85 font-light mt-2 block">
                    <label className="text-xs md:text-sm text-gray-300 md:text-white/60 font-light mt-2 block">
                      Mensaje para los novios
                    </label>
                  </div>

                  {/* Botón mejorado para móvil */}
                  <div className="pt-6 md:pt-8">
                    <button
                      type="submit"
                      disabled={isLoading || Object.keys(errors).length > 0 || !name.trim() || !email.trim()}
                      className="group relative w-full bg-white/90 hover:bg-white border border-white/50 
                        hover:border-white text-gray-900 font-light text-base md:text-lg rounded-xl md:rounded-2xl 
                        py-3 md:py-4 px-6 md:px-8 transition-all duration-500 backdrop-blur-sm overflow-hidden
                        disabled:bg-white/60 disabled:border-white/40 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                        {isLoading ? (
                          <>
                            <Loader className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                            <span className="text-sm md:text-base">Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="text-sm md:text-base">Confirmar asistencia</span>
                          </>
                        )}
                      </span>
                      {/* Efecto de hover mejorado */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12"></div>
                    </button>
                  </div>

                  {/* Footer adaptado para móvil */}
                  <div className="text-center pt-4 md:pt-6">
                    <p className="text-white/60 text-xl font-light mt-3 italic">
                      📞 Reservas en el Parador:<br />
                      contacta con Mariona <br />
                      676 74 25 70 😏
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
