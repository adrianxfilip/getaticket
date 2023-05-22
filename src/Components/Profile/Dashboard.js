import "../../Styles/UserDashboard.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchURL } from "../../settings";
import { useEffect, useState } from "react";
import { loadUserData } from "../../actions";
import UserTickets from "./UserTickets";
import PersonalInfo from "./PersonalInfo";
import { logIn } from "../../actions";

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

  const [activeDashboard, setDashboard] = useState("personalInfo");

  const dashboardPanels = {
    userTickets: <UserTickets />,
    personalInfo: <PersonalInfo />,
  };

  const [showID, setShowID] = useState(false)

  if (userData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="dashboard-page"
      >
        <div>
          <div className="user-id-wrapper">
            <p className="user-name">{userData.firstName + " " + userData.secondName}</p>
            {showID ? <p className="user-id">{id}</p> : <p className="show-id-btn" onClick={()=>{setShowID(true)}}>Vezi ID</p>}
          </div>
          <div className="dashboard-menu">
            <ul>
              <li
                className={activeDashboard == "personalInfo" ? "active" : ""}
                onClick={() => {
                  setDashboard("personalInfo");
                }}
              >
                Informații personale
              </li>
              <li
                className={activeDashboard == "userTickets" ? "active" : ""}
                onClick={() => {
                  setDashboard("userTickets");
                }}
              >
                Ticketele Mele
              </li>
              <li onClick={()=>{dispatch(logIn("", ""))}}>Deconectare</li>
            </ul>
          </div>
        </div>
        {dashboardPanels[activeDashboard]}
      </motion.div>
    );
  }
}

export default UserDashboard;
