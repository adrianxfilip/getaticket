import "../../Styles/UserDashboard.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchURL } from "../../settings";
import { useEffect, useState } from "react";
import { loadUserData } from "../../actions";
import { Link } from "react-router-dom";

function UserTickets() {
  const userContests = useSelector((state) => state.userContests);

  const months = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="user-tickets-container"
    >
      <p>Tickete</p>
      <table>
        <thead>
          <tr>
            <th>Data Extragerii</th>
            <th>Nr. Comanda</th>
            <th>Concurs</th>
          </tr>
        </thead>
        <tbody>
          {userContests.map((contest, index) => {
            var date = new Date(contest.drawDate);
            return (
              <tr key={index}>
                <td>{date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()}</td>
                <td>
                  {contest.ticketID} <br /> <span>{contest.ticketEntries} {contest.ticketEntries > 1 ? "tickete" : "ticket"}</span>
                </td>
                <td>
                  <Link to={"/contests/" + contest.contestID}>
                    {contest.contestName}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}

export default UserTickets;
