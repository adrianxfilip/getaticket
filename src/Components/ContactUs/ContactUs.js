import "../../Styles/ContactUs.scss";

export default function ContactUs() {
  return (
    <div className="contact-us-page">
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
            <input type="text"></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email"></input>
          </div>
          <div className="form-group">
            <label>Subiect</label>
            <input type="text"></input>
          </div>
          <div className="form-group">
            <label>Mesaj</label>
            <input type="text"></input>
          </div>
        </form>
      </div>
    </div>
  );
}
