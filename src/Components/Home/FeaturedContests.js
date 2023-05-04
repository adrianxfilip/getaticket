import { current } from "immer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../Styles/FeaturedContests.scss";

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
            <p className="remaining-time"> {props.remainingTime} <span>zile</span></p>
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

export default function FeaturedContests() {
  const [contestsNumber, setNumber] = useState(0);
  const [initialContestIndex, setInitialContestIndex] = useState(0);
  const [currentContestIndex, setCurrentContestIndex] = useState(0)
  const [featuredContests, setContests] = useState([]);
  const contests = useSelector((state)=>state.contestsData)

  useEffect(() => {
    if(contests){
      setContests(contests.filter((contest) => contest.featured === true));
      setNumber(featuredContests.length - 1)
      setInitialContestIndex(window.innerWidth > 1300 ? 2 : window.innerWidth > 800 ? 1 : 0)
      setCurrentContestIndex(window.innerWidth > 1300 ? 2 : window.innerWidth > 800 ? 1 : 0)
    }
  }, [contests]);

  const handleScroll = (newIndex) => {
    if(newIndex < initialContestIndex){
      newIndex = contestsNumber
    }
    if(newIndex > contestsNumber){
      newIndex = initialContestIndex
    }
    setCurrentContestIndex(newIndex)
    document.getElementById("C" + newIndex).scrollIntoView({
      inline: "end",
      behavior: "smooth",
      block: "nearest",
    });
  };

  return (
    <div className="featured-contests-section">
      <div className="section-title-container">
        <h2>Revendică-ți șansa și câștigă</h2>
        <h1>CONCURSURI APROAPE DE ÎNCHEIERE</h1>
        <p>
          Participanții cumpără bilete iar câștigătorul se va determina prin
          tragere la sorți
        </p>
      </div>
      <div className="featured-contests-container">
        <i
          className="fi fi-rr-arrow-small-left"
          onClick={() => {
            handleScroll(currentContestIndex - 1);
          }}
        ></i>
        <div className="featured-contests">
          {featuredContests
            ? featuredContests.map((contest, index) => {
                let now = new Date();
                let then = new Date(contest.date);
                let difference = then.getTime() - now.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return (
                  
                  <ContestCard
                    name={contest.name + index}
                    price={contest.pricePerTicket}
                    remainingTime={TotalDays}
                    remainingTickets={
                      contest.totalTickets - contest.soldTickets
                    }
                    src={contest.images[0]}
                    id={"C" + index}
                    contestID={contest._id}
                    key={index}
                  ></ContestCard>

                );
              })
            : ""}
        </div>
        <i
          className="fi fi-rr-arrow-small-right"
          onClick={() => {
            handleScroll(currentContestIndex + 1);
          }}
        ></i>
      </div>
    </div>
  );
}
