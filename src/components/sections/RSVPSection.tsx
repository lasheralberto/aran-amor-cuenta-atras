
import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState("0");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [message, setMessage] = useState("");
  const [messageSong, setMessageSong] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          }
        }
      ]
    };

    try {
      const response = await fetch("https://api.airtable.com/v0/appGU5yB2ZkikiTnf/tbluQQwjnh26iyhBw", {
        method: "POST",
        headers: {
          Authorization: "Bearer patkZYGQfxVNjVZQq.4203f8a5a8b89553d0f846fdb834df351dc8424ecab6e75123e79531f4f7a3fd",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Datos enviados a Airtable:", result);
        setIsSubmitted(true);

        // Resetea el formulario
        setName("");
        setEmail("");
        setAttendance("yes");
        setGuests("0");
        setDietaryRestrictions("");
        setMessage("");
        setMessageSong("");
      } else {
        console.error("Error al enviar a Airtable:", result);
        alert("Ocurrió un error al enviar los datos.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red. Intenta de nuevo más tarde.");
    }
  };

  return (
    <section id="rsvp" className="py-10 md:py-16 lg:py-24 winter-section">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-cursive text-center text-white font-bold mb-6 md:mb-10">Confirmación de Asistencia</h2>
        <div className="max-w-2xl mx-auto bg-winter-dark/50 rounded-lg shadow-lg p-4 sm:p-5 md:p-8 border border-white/10">
          {isSubmitted ? (
            <div className="text-center py-4 md:py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-winter-accent mb-4 md:mb-6">
                <Check className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">¡Gracias por confirmar!</h3>
              <p className="text-sm md:text-base text-white font-light mb-4 md:mb-6">
                Hemos recibido tu confirmación. ¡Estamos deseando celebrar este día tan especial contigo!
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
                <label htmlFor="name" className="block text-sm md:text-base text-white font-normal mb-1">
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
                <label htmlFor="email" className="block text-sm md:text-base text-white font-normal mb-1">
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
                  <label htmlFor="dietary" className="block text-sm md:text-base text-white font-normal mb-1">
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
                <label htmlFor="messageSong" className="block text-sm md:text-base text-white font-normal mb-1">
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
                <label htmlFor="message" className="block text-sm md:text-base text-white font-normal mb-1">
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

              <div className="pt-1 md:pt-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full border-winter-accent text-white hover:bg-winter-accent/20 transition-colors duration-300 font-normal"
                >
                  <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Confirmar asistencia
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
