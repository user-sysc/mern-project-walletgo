import "../../styles/contact.css";
import Swal from "sweetalert2";
import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title:
        '<strong style="color: white;">¡Hemos recibido tu mensaje!</strong>',
      html: '<i style="color: white;">Gracias por contactarnos. Te responderemos a la brevedad.</i>',
      icon: "success",
      background: "#12151E",
      confirmButtonColor: "#1DB13E",
      timer: 3000,
    });

    // Limpiar el formulario
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact" id="contact">
      <div className="rightSide">
        <h1 className="h1-contact"> Contact Us</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="label-contact" htmlFor="name">
            Full Name
          </label>
          <input
            className="input-contact"
            name="name"
            placeholder="..."
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="label-contact" htmlFor="email">
            Email
          </label>
          <input
            className="input-contact"
            name="email"
            placeholder="..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label-contact" htmlFor="message">
            Message
          </label>
          <textarea
            className="textarea"
            rows="6"
            placeholder="..."
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button className="buton-form" type="submit">
            {" "}
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
