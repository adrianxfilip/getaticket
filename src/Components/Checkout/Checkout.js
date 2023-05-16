import "../../Styles/Checkout.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState } from "react";
import paysafe from "../../Assets/paysafecard-logo.png";
import { Link } from "react-router-dom";
import {fetchURL} from "../../settings"
import { clearCart } from "../../actions";
import { useDispatch } from "react-redux";

function LogInPrompt() {
  const id = useSelector((state) => state.loggedID);

  return id == "" ? (
    <div className="already-registered-prompt">
      <p>
        {" "}
        Ai deja un cont?
        <br />
        <span>Autentifică-te pentru a cumpăra tickete mai ușor.</span>
      </p>
      <Link to="/profile">
        {" "}
        <i className="fi fi-rr-user"></i>
        <p>Autentificare</p>
      </Link>
    </div>
  ) : (
    ""
  );
}

export default function Checkout() {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch()

  var totalPrice = Object.values(cart).reduce(
    (item, { ppt, tickets }) => item + ppt * tickets,
    0
  );

  var userID = useSelector((state) => state.loggedID)

  const [contact, setContact] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    county: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [confirmations, setConfirmations] = useState({
    legalAge: false,
    terms: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const submitPayment = () => {
    const regex =
      /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
    if (!regex.test(contact.phoneNumber)) {
      setErrorMessage("Numărul de telefon este invalid.");
      return;
    }
    if (!confirmations.legalAge) {
      setErrorMessage("Vă rugăm să confirmați că ați împlinit vârsta de 18 ani!");
      return;
    }
    if (!confirmations.terms) {
      setErrorMessage("Vă rugăm să confirmați că sunteți de acord cu Termenii și condițiile noastre!");
      return;
    }
    fetch(fetchURL + "/submitPayment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        contact : contact,
        userID : userID,
        cartInfo : cart
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success == true){
          dispatch(clearCart());
          window.location.href = "/order/" + res.ticketID 
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      className="checkout-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="checkout-container">
        <div>
          <LogInPrompt />
          <div className="contact-details-wrapper">
            <p>Introdu datele tale de contact.</p>
            <form
              id="form1"
              onSubmit={(e) => {
                e.preventDefault();
                submitPayment();
              }}
            >
              <div className="form-group">
                <label>Nume Complet</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      fullName: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label>Adresă de Email</label>
                <input
                  type="email"
                  required
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      email: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label>Județ</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      county: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label>Localitate</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      city: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label>Strada și numărul</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      street: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label>Număr de telefon</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      phoneNumber: e.target.value,
                    })
                  }
                ></input>
              </div>
            </form>
          </div>
        </div>
        <div className="total-wrapper">
          <p className="card-name">Tickete</p>
          {Object.keys(cart).map((key, index) => (
            <div className="ticket-wrapper">
              <p className="ticket">
                {cart[key].name}
                <br />
                <span>
                  ({cart[key].tickets} X {"€" + cart[key].ppt})
                </span>
              </p>
              <p className="ticket-price">
                {"€" + cart[key].ppt * cart[key].tickets}
              </p>
            </div>
          ))}
          <p className="total-price">
            Total <br />
            <span>{"€" + totalPrice}</span>
          </p>
          <div className="payment-method">
            <p>Alege metoda de plată</p>
            <div>
              <button
                className="credit-card"
                onClick={() => {
                  setPaymentMethod("card");
                }}
                style={{
                  borderColor:
                    paymentMethod == "card" ? "#06bcdd" : "#6472d99a",
                }}
              >
                <i className="fi fi-rr-credit-card"></i>
                Card
              </button>
              <button
                className="paysafe"
                onClick={() => {
                  setPaymentMethod("paysafe");
                }}
                style={{
                  borderColor:
                    paymentMethod == "paysafe" ? "#06bcdd" : "#6472d99a",
                }}
              >
                <img src={paysafe} />
              </button>
            </div>
          </div>
          <div className="confirmations-container">
            <div
              className="input-group"
              onClick={() => {
                setConfirmations({
                  ...confirmations,
                  legalAge: !confirmations.legalAge,
                });
              }}
            >
              <div className="checkbox">
                <i
                  class="fi fi-br-check checkmark"
                  style={{
                    visibility: confirmations.legalAge ? "visible" : "hidden",
                  }}
                ></i>
              </div>
              <p className="legal-age"> Confirm că am peste 18 ani.</p>
            </div>
            <div
              className="input-group"
              onClick={() => {
                setConfirmations({
                  ...confirmations,
                  terms: !confirmations.terms,
                });
              }}
            >
              <div className="checkbox">
                <i
                  class="fi fi-br-check checkmark"
                  style={{
                    visibility: confirmations.terms ? "visible" : "hidden",
                  }}
                ></i>
              </div>
              <p className="accept-terms">
                Confirm că am citit și sunt de acord cu{" "}
                <span>Termenii si condițiile.</span>
              </p>
            </div>
          </div>
          <p className="error-message">{errorMessage}</p>
          <button type="submit" form="form1" className="finish-order">
            Finalizează comanda
          </button>
        </div>
      </div>
    </motion.div>
  );
}
