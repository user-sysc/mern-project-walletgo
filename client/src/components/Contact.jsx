import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact" id="contact">
      <div className="rightSide">
        <h1 className="h1-contact"> Contact Us</h1>
        <form className="contact-form" method="POST">
          <label className="label-contact" htmlFor="name">
            Full Name
          </label>
          <input
            className="input-contact"
            name="name"
            placeholder="..."
            type="text"
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
