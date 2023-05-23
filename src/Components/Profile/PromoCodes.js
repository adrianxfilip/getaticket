import "../../Styles/UserDashboard.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchURL } from "../../settings";
import { useEffect, useState } from "react";
import { loadUserData } from "../../actions";
import { Link } from "react-router-dom";

function EnterCode() {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const userID = useSelector((state)=>state.loggedID)

  const submitCode = () => {
    setLoading(true);
    fetch(fetchURL + "/redeemCode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        promoCode: code,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if (res.success == true) {
            setErrorMessage("Succes! Poți vedea ticketul tău în secțiunea 'Ticketele Mele'")
        }else{
            setErrorMessage(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="enter-code-wrapper">
      <h2>Revendică un cod</h2>
      <p className="error-message">{errorMessage}</p>
      <form
        className="promo-code-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitCode();
        }}
      >
        <input
          type="text"
          placeholder="Introdu codul aici"
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></input>
        <button type="submit">
          {isLoading ? <i className="fi fi-rr-spinner"></i> : "Aplică codul"}
        </button>
      </form>
    </div>
  );
}

function PromoCodes() {
  const userContests = useSelector((state) => state.userContests);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="promo-codes-container"
    >
      <EnterCode />
    </motion.div>
  );
}

export default PromoCodes;
