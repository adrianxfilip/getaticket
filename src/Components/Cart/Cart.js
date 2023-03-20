import "../../Styles/Cart.scss";
import { motion } from "framer-motion";

export default function Cart() {
  return (
    <motion.div
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    ></motion.div>
  );
}
