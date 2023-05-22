import "../../Styles/UserDashboard.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchURL } from "../../settings";
import { useEffect, useState } from "react";
import { loadUserData } from "../../actions";
import UserTickets from "./UserTickets";

function UserDashboard() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.loggedID);

  const userData = useSelector((state) => state.userData);

  const userContests = useSelector((state) => state.userContests);

  const getData = () => {
    if (id) {
      fetch(fetchURL + "/getData", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch(loadUserData(res.userData, res.userContests));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [activeDashboard, setDashboard] = useState("userTickets");

  const dashboardPanels = {
    userTickets : <UserTickets />
  }

  if (userData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="dashboard-page"
      >
        <div className="dashboard-menu">
          <ul>
            <li
              className={activeDashboard == "userTickets" ? "active" : ""}
              onClick={() => {
                setDashboard("userTickets");
              }}
            >
              Ticketele Mele
            </li>
            <li
              className={activeDashboard == "personalInfo" ? "active" : ""}
              onClick={() => {
                setDashboard("personalInfo");
              }}
            >
              Informații personale
            </li>
            <li>Deconectare</li>
          </ul>
        </div>
        {dashboardPanels[activeDashboard]}
      </motion.div>
    );
  }
}

export default UserDashboard;
