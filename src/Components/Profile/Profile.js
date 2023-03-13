import "../../Styles/Profile.scss";
import Signin from "./Signin";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Profile() {

  const token = useSelector(state => state.loggedID)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity :0}}
      transition={{ duration: 0.2 }}
      className="profile-page"
    >
      {token ? <h1 style={{color : "white", textAlign:"center"}}>LOGGED IN!!!</h1> : <Signin></Signin>}
    </motion.div>
  );
}

export default Profile;
