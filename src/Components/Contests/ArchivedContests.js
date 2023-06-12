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
          {props.isGiveaway ? (
            <p className="ticket-price giveaway">Giveaway</p>
          ) : (
            <p className="ticket-price">
              ${props.price}
              <br />
              <span>Preț ticket</span>
            </p>
          )}
        </div>
        <div className="info-wrapper second-wrapper">
          {props.remainingTime > 0 && props.remainingTickets > 0 ? (
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
            <p
              style={{
                fontSize: "18px",
                color: "white",
                textAlign: "center",
                margin: "0",
              }}
            >
              Înscrierile la acest cocurs s-au încheiat
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ArchivedContests() {
  const contests = useSelector((state) => state.contestsData);

  if (contests) {
    return (
      <div className="contests-page">
        <div className="contests-container">
          <h1 className="archived-contests-title">Concursuri finalizate</h1>
          <div className="contests-wrapper">
            {contests != [] ? (
              contests.map((contest, index) => {
                let now = new Date();
                let then = new Date(contest.date);
                let difference = then.getTime() - now.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return (
                  <ContestCard
                    name={contest.name}
                    price={contest.pricePerTicket}
                    remainingTime={TotalDays}
                    remainingTickets={
                      contest.totalTickets - contest.soldTickets
                    }
                    src={contest.images[0]}
                    id={"C" + index}
                    contestID={contest._id}
                    key={index}
                    isGiveaway={contest.giveaway.isGiveaway}
                  ></ContestCard>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <Link className="archived-contests-btn" to="/contests">Vezi concursuri active</Link>
        </div>
      </div>
    );
  }
}
