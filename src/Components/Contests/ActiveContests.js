import "../../Styles/ActiveContests.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
          <div>
            <i className="fi fi-rr-clock-three"></i>
            <p className="remaining-time">
              {" "}
              {props.remainingTime} <span>zile</span>
            </p>
          </div>
          <div>
            <i className="fi fi-rs-ticket alt"></i>
            <p className="remaining-tickets">
              {props.remainingTickets} <span>Rămase</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ActiveContests() {
  const contests = useSelector((state) => state.contestsData);

  return (
    <div className="contests-page">
      {contests?.map((contest, index) => {
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
      })}
    </div>
  );
}
