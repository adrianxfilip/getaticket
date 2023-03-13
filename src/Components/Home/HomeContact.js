import "../../Styles/HomeContact.scss";
import faq from "../../Assets/faq2.png"
import agent from "../../Assets/support.png"

export default function HomeContact() {
  return (
    <section className="contact-section">
      <div className="section-title-container">
        <h2>Ai întrebări sau nelămuriri</h2>
        <h1>ÎNTREBĂRI FRECVENTE</h1>
        <p>
          Dacă nu găsești raspunsul la întrebarea ta, nu ezita să ne contactezi
        </p>
      </div>
      <div className="cards-container">
      <div className="card">
            <img src={agent}/>
          <div>
            <p className="card-title">Contactează echipa de suport</p>
            <p className="card-description">
              Ai o intrebare legată de WEBSITENAME? Scrie-ne pe WhatsApp sau trimite-ne un mail.
            </p>
            <div className="card-button-wrapper">
            <a>WhatsApp</a>
            <a>Email</a>
            </div>
          </div>
        </div>
        <div className="card">
            <img src={faq}/>
          <div>
            <p className="card-title">Ghidul nostru</p>
            <p className="card-description">
              Verifică intrebările frecvente pentru a găsi un răspuns la
              întrebarea ta
            </p>
            <div className="card-button-wrapper">
            <a>Întrebări Frecvente</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
