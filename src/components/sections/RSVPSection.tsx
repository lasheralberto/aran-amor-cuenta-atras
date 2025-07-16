import { useState } from "react";
import { Check, Mail, Loader } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

// Puedes usar cualquier date picker de tu stack, aquí se usa el nativo HTML5 para simplicidad
const ROOM_OPTIONS = [
  "Habitación doble con desayuno (100€)",
  "Habitación doble con desayuno, uso individual (90€)",
  "Supletorio adulto (+12 años) con desayuno (+35€)",
  "Supletorio niño en habitación (-12 años) con desayuno (+25€)",
];

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState("0");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [message, setMessage] = useState("");
  const [messageSong, setMessageSong] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // NUEVO ESTADO PARA PARADOR
  const [stayAtParador, setStayAtParador] = useState<"yes" | "no" | "">("");
  const [paradorRoom, setParadorRoom] = useState("");
  const [paradorCheckIn, setParadorCheckIn] = useState("");
  const [paradorCheckOut, setParadorCheckOut] = useState("");

  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      records: [
        {
          fields: {
            Nombre: name,
            Email: email,
            Asistencia: attendance,
            Restricciones: dietaryRestrictions,
            Cancion: messageSong,
            Mensaje: message,
            DormirEnParador: stayAtParador === "yes" ? "Sí" : "No",
            ...(stayAtParador === "yes"
              ? {
                  TipoHabitacion: paradorRoom,
                  FechaEntrada: paradorCheckIn,
                  FechaSalida: paradorCheckOut,
                }
              : {}),
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
        setAttendance("yes");
        setGuests("0");
        setDietaryRestrictions("");
        setMessage("");
        setMessageSong("");
        setStayAtParador("");
        setParadorRoom("");
        setParadorCheckIn("");
        setParadorCheckOut("");
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
    <section id="rsvp" className="py-10 md:py-16 lg:py-24 winter-section">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-cursive text-center text-white font-bold mb-6 md:mb-10">
          Confirmación de Asistencia
        </h2>
        <div className="max-w-2xl mx-auto bg-winter-dark/50 rounded-lg shadow-lg p-4 sm:p-5 md:p-8 border border-white/10">
          {isSubmitted ? (
            <div className="text-center py-4 md:py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-winter-accent mb-4 md:mb-6">
                <Check className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                ¡Gracias por confirmar!
              </h3>
              <p className="text-sm md:text-base text-white font-light mb-4 md:mb-6">
                Hemos recibido tu confirmación. ¡Estamos deseando celebrar este día
                tan especial contigo!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm md:text-base text-winter-icy hover:text-white transition-colors font-normal"
              >
                Enviar otra respuesta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm md:text-base text-white font-normal mb-1"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-white text-sm md:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm md:text-base text-white font-normal mb-1"
                >
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-white text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base text-white font-normal mb-1">
                  ¿Asistirás a nuestra boda? *
                </label>
                <div className="space-y-1 md:space-y-2">
                  <label className="flex items-center text-sm md:text-base text-white font-normal">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === "yes"}
                      onChange={() => setAttendance("yes")}
                      className="mr-2 h-3 w-3 md:h-4 md:w-4 text-winter-accent"
                    />
                    Sí, asistiré
                  </label>
                  <label className="flex items-center text-sm md:text-base text-white font-normal">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === "no"}
                      onChange={() => setAttendance("no")}
                      className="mr-2 h-3 w-3 md:h-4 md:w-4 text-winter-accent"
                    />
                    No podré asistir
                  </label>
                </div>
              </div>

              {attendance === "yes" && (
                <div>
                  <label
                    htmlFor="dietary"
                    className="block text-sm md:text-base text-white font-normal mb-1"
                  >
                    Restricciones alimentarias
                  </label>
                  <textarea
                    id="dietary"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    rows={2}
                    className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-white text-sm md:text-base"
                    placeholder="Alergias, intolerancias, u otras restricciones alimentarias"
                  ></textarea>
                </div>
              )}

              <div>
                <label
                  htmlFor="messageSong"
                  className="block text-sm md:text-base text-white font-normal mb-1"
                >
                  Dinos tu canción de "ahora sí, empieza la fiesta"
                </label>
                <textarea
                  id="messageSong"
                  value={messageSong}
                  onChange={(e) => setMessageSong(e.target.value)}
                  rows={2}
                  className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-white text-sm md:text-base"
                  placeholder="Prohibida la de 'Despacito..'"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm md:text-base text-white font-normal mb-1"
                >
                  Mensaje para los novios (opcional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-white text-sm md:text-base"
                  placeholder="Si quieres dejarnos un mensaje..."
                ></textarea>
              </div>

              {/* NUEVO BLOQUE: Dormir en el parador */}
              <div>
                <label className="block text-sm md:text-base text-white font-normal mb-1">
                  ¿Tienes pensado quedarte a dormir en el parador? *
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center text-white text-sm md:text-base font-normal">
                    <input
                      type="radio"
                      name="stayAtParador"
                      value="yes"
                      checked={stayAtParador === "yes"}
                      onChange={() => setStayAtParador("yes")}
                      required
                      className="mr-2 h-3 w-3 md:h-4 md:w-4 text-winter-accent"
                    />
                    Sí
                  </label>
                  <label className="inline-flex items-center text-white text-sm md:text-base font-normal">
                    <input
                      type="radio"
                      name="stayAtParador"
                      value="no"
                      checked={stayAtParador === "no"}
                      onChange={() => setStayAtParador("no")}
                      required
                      className="mr-2 h-3 w-3 md:h-4 md:w-4 text-winter-accent"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Si elige SÍ, mostrar calendario y dropdown */}
              {stayAtParador === "yes" && (
                <>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="paradorCheckIn"
                        className="block text-sm md:text-base text-white font-normal mb-1"
                      >
                        Fecha de entrada *
                      </label>
                      <input
                        type="date"
                        id="paradorCheckIn"
                        value={paradorCheckIn}
                        onChange={(e) => setParadorCheckIn(e.target.value)}
                        min="2026-01-12"
                        max="2026-01-21"
                        required
                        className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-white text-sm md:text-base"
                      />
                    </div>
                    <div className="flex-1 mt-4 md:mt-0">
                      <label
                        htmlFor="paradorCheckOut"
                        className="block text-sm md:text-base text-white font-normal mb-1"
                      >
                        Fecha de salida *
                      </label>
                      <input
                        type="date"
                        id="paradorCheckOut"
                        value={paradorCheckOut}
                        onChange={(e) => setParadorCheckOut(e.target.value)}
                        min="2026-01-12"
                        max="2026-01-21"
                        required
                        className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-white text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="paradorRoom"
                      className="block text-sm md:text-base text-white font-normal mb-1 mt-4"
                    >
                      Tipo de habitación *
                    </label>
                    <select
                      id="paradorRoom"
                      value={paradorRoom}
                      onChange={(e) => setParadorRoom(e.target.value)}
                      required
                      className="w-full px-3 md:px-4 py-1.5 md:py-2 border border-white/20 bg-[#14213d] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-winter-accent text-sm md:text-base"
                    >
                      <option value="" className="bg-[#14213d] text-white">Selecciona una opción</option>
                      {ROOM_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-[#14213d] text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="pt-1 md:pt-2">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full relative overflow-hidden border-winter-accent text-white font-bold text-lg rounded-xl bg-winter-accent hover:bg-winter-accent/90 transition-all duration-500 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <Loader className="h-4 w-4 md:h-5 md:w-5 mr-2 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    )}
                    {isLoading ? "Enviando..." : "Confirmar asistencia"}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 animate-shimmer pointer-events-none" />
                </Button>
              </div>

              <p className="text-xs text-white/70 text-center mt-2 md:mt-4 font-normal">
                * Campos requeridos
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
