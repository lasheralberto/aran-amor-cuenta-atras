import { useState } from "react";
import { Check, Mail } from "lucide-react";

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState("0");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [message, setMessage] = useState("");
  const [messageSong, setMessageSong] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <section id="rsvp" className="py-16 md:py-24 bg-wedding-burgundy/10">
      <div className="section-container">
        <h2 className="section-title">Confirmación de Asistencia</h2>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wedding-gold mb-6">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-wedding-burgundy mb-4">¡Gracias por confirmar!</h3>
              <p className="text-wedding-slate mb-6">
                Hemos recibido tu confirmación. ¡Estamos deseando celebrar este día tan especial contigo!
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-wedding-burgundy hover:text-wedding-gold transition-colors font-medium"
              >
                Enviar otra respuesta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-wedding-slate font-medium mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-burgundy"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-wedding-slate font-medium mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-burgundy"
                />
              </div>

              <div>
                <label className="block text-wedding-slate font-medium mb-1">
                  ¿Asistirás a nuestra boda? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === "yes"}
                      onChange={() => setAttendance("yes")}
                      className="mr-2 h-4 w-4 text-wedding-burgundy"
                    />
                    Sí, asistiré
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === "no"}
                      onChange={() => setAttendance("no")}
                      className="mr-2 h-4 w-4 text-wedding-burgundy"
                    />
                    No podré asistir
                  </label>
                </div>
              </div>

              {attendance === "yes" && (
                <div>
                  <label htmlFor="dietary" className="block text-wedding-slate font-medium mb-1">
                    Restricciones alimentarias
                  </label>
                  <textarea
                    id="dietary"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-burgundy"
                    placeholder="Alergias, intolerancias, u otras restricciones alimentarias"
                  ></textarea>
                </div>
              )}

              <div>
                <label htmlFor="messageSong" className="block text-wedding-slate font-medium mb-1">
                  Dinos tu canción de "ahora sí, empieza la fiesta"
                </label>
                <textarea
                  id="messageSong"
                  value={messageSong}
                  onChange={(e) => setMessageSong(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-burgundy"
                  placeholder="Prohibida la de 'Despacito..'"
                ></textarea>
              </div>

              <div>
                <label htmlFor="message" className="block text-wedding-slate font-medium mb-1">
                  Mensaje para los novios (opcional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-burgundy"
                  placeholder="Si quieres dejarnos un mensaje..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-wedding-burgundy hover:bg-wedding-burgundy/80 text-white py-3 rounded-md transition-colors duration-300 font-medium flex items-center justify-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Confirmar asistencia
                </button>
              </div>

              <p className="text-xs text-wedding-slate text-center mt-4">
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
