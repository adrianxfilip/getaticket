import "../../Styles/ContactUs.scss";
import { motion } from "framer-motion";
import phone from "../../Assets/phone.png"
import email from "../../Assets/email.png"
import contact from "../../Assets/contact.png"

export default function ContactUs() {
  return (
    <motion.div
      className="contact-us-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h1>Contactează-ne</h1>
      <p>
        Trimite-ne un mesaj mai jos și vei primi un răspuns cât mai rapid
        posibil.
      </p>
      <div className="contact-form-wrapper">
        <form>
          <p>Trimite-ne un mesaj</p>
          <div className="form-group">
            <label>Nume</label>
            <input type="text" placeholder="Numele dumneavoastră"></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Adresa de email"></input>
          </div>
          <div className="form-group">
            <label>Subiect</label>
            <input type="text" placeholder="Subiect"></input>
          </div>
          <div className="form-group">
            <label>Mesaj</label>
            <textarea type="text" placeholder="Mesaj"></textarea>
          </div>
          <button type="submit">
            TRIMITE MESAJUL
          </button>
        </form>
        <div className="info-wrapper">
          <div className="info-card">
            <img src={phone} className="info-img"></img>
            <div>
            <p>NUMAR DE TELEFON</p>
            <p>072141241214</p>
            </div>
          </div>
          <div className="info-card">
            <img src={email} className="info-img"></img>
            <div>
            <p>EMAIL</p>
            <p>info@gmail.com</p>
            </div>
          </div>
          <img src={contact} className="contact-img"></img>
        </div>
      </div>
    </motion.div>
  );
}
