import "../../Styles/HowToPlay.scss";
import img1 from "../../Assets/1.png";
import img2 from "../../Assets/2.png";
import img3 from "../../Assets/3.png";

function PlayCard(props) {
  return (
    <div className="play-card">
      <p className="card-number">0{props.cardNumber}</p>
      <div className="img-wrapper">
        <img src={props.src} />
      </div>
      <p className="card-title">{props.cardTitle}</p>
      <p className="card-description">{props.cardDescription}</p>
    </div>
  );
}

export default function HowToPlay() {
  return (
    <section className="how-to-play-section">
      <div className="container">
        <div className="section-title-container">
          <h2>Trebuie să știi</h2>
          <h1>CUM PARTICIPI</h1>
          <p>Urmărește acești 3 pași</p>
        </div>
        <div className="cards-container">
          <PlayCard
            src={img1}
            cardNumber={1}
            cardTitle="ALEGE"
            cardDescription="Fă-ți un cont si alege un concurs"
          />
          <PlayCard
            src={img2}
            cardNumber={2}
            cardTitle="CUMPĂRĂ"
            cardDescription="Cumpără un ticket la concursul ales"
          />
          <PlayCard
            src={img3}
            cardNumber={3}
            cardTitle="CÂȘTIGĂ"
            cardDescription="Pregătește-te să câștigi premiul."
          />
        </div>
      </div>
    </section>
  );
}
