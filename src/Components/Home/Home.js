import "../../Styles/Home.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeaturedContests from "./FeaturedContests";
import NextDraw from "./NextDraw";
import HowToPlay from "./HowToPlay";
import HomeContact from "./HomeContact";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="landing"
    >
      <div className="wrapper">
        <p className="luck">Încercă-ți norocul!</p>
        <h1>
          CÂȘTIGĂ <br /> PREMII
        </h1>
        <p>
          Cumpără un bilet la unul dintre concursurile noastre și devino
          următorul câștigător.
        </p>
        <Link to="/contests">
          <button>Participă</button>
        </Link>
      </div>
      <NextDraw/>
      <FeaturedContests></FeaturedContests>
      <HowToPlay></HowToPlay>
      <HomeContact></HomeContact>
    </motion.div>
  );
}

export default Home;
