import "../../Styles/Cart.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartCard(props) {
  return (
    <div className="cart-item-card">
      <div className="item-info-wrapper">
        <img src={props.image}></img>
        <div className="item-info">
          <p className="item-name">{props.name}</p>
          <p>
            €{props.tickets * props.ppt}
            <span>
              {" "}
              ({props.tickets} X {"€" + props.ppt})
            </span>
          </p>
        </div>
      </div>
      <div className="item-actions">
        <Link to={"/contests/" + props.id} className="edit-item">
          <i className="fi fi-rr-pencil"></i>
        </Link>
        <Link className="delete-item">
          <i className="fi fi-rr-trash"></i>
        </Link>
      </div>
    </div>
  );
}

export default function Cart() {
  const cart = useSelector((state) => state.cart);

  var totalPrice =  Object.values(cart).reduce((item, { ppt, tickets }) => item + ppt * tickets, 0);

  return (
    <motion.div
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h1>Coșul Meu</h1>
      <div className="cart-container">
        <div className="cart-items-container">
          <div className="items-container-title-wrapper">
            <h2>Tickete</h2>
            <h2 className="clear-cart">Golește coșul</h2>
          </div>
          {Object.keys(cart).map((key, index) => (
            <CartCard
              tickets={cart[key].tickets}
              ppt={cart[key].ppt}
              id={cart[key].id}
              image={cart[key].image}
              name={cart[key].name}
              key={index}
            />
          ))}
        </div>
        <div className="cart-total-container">
          <h2>Total</h2>
          <h2>€{totalPrice}</h2>
        </div>
        <button className="checkout-button">
            Finalizează comanda
        </button>
      </div>
    </motion.div>
  );
}
