import "../../Styles/ActiveContests.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ContestCard(props) {
  return (
    <Link to={"/contests/" + props.contestID}>
      <div className="contest-card" id={props.id}>
        <div className="image-wrapper">
          <img src={props.src}></img>
        </div>
        <div className="info-wrapper first-wrapper">
          <p className="prize-name">{props.name}</p>
          <p className="ticket-price">
            ${props.price}
            <br />
            <span>Preț ticket</span>
          </p>
        </div>
        <div className="info-wrapper second-wrapper">
        {props.remainingTime > 0 ? (
            <>
              {" "}
              <div>
                <i className="fi fi-rr-clock-three"></i>
                <p className="remaining-time">
                  {props.remainingTime <= 1
                    ? "<" + props.remainingTime
                    : props.remainingTime}
                  <span>{props.remainingTime <= 1 ? " zi" : " zile"}</span>
                </p>
              </div>
              <div>
                <i className="fi fi-rs-ticket alt"></i>
                <p className="remaining-tickets">
                  {props.remainingTickets} <span>Rămase</span>
                </p>
              </div>
            </>
          ) : (
            <p style={{fontSize : "18px", color :"white", textAlign:"center", margin: "0"}}>Înscrierile la acest cocurs s-au încheiat</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ActiveContests() {
  const contestsData = useSelector((state) => state.contestsData);

  const [contests, setContests] = useState([{
    _id: "",
    name: "",
    overview: "",
    specs: {},
    date: new Date("2022-03-25"),
    totalTickets: 0,
    soldTickets: 0,
    pricePerTicket: 0,
    type: "",
    featured: true,
    images: [],
    maxTickets: 0,
  }]);

  useEffect(()=>{
    if (contestsData) {
      setContests(contestsData);
    }
  }, [contestsData])

  return (
    <div className="contests-page">
      <div className="contests-container">
        <h1>Concursuri</h1>
        <div className="contests-wrapper">
          {contests != [] ? contests.map((contest, index) => {
            let now = new Date();
            let then = new Date(contest.date);
            let difference = then.getTime() - now.getTime();
            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
            return (
              <ContestCard
                name={contest.name + index}
                price={contest.pricePerTicket}
                remainingTime={TotalDays}
                remainingTickets={contest.totalTickets - contest.soldTickets}
                src={contest.images[0]}
                id={"C" + index}
                contestID={contest._id}
                key={index}
              ></ContestCard>
            );
          }) : <></>}
        </div>
      </div>
    </div>
  );
}
