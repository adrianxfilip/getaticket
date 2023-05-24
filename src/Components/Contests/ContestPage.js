import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "../../Styles/ContestPage.scss";
import displacement from "../../Assets/displacement.png";
import horsepower from "../../Assets/horsepower.png";
import km from "../../Assets/km.png";
import year from "../../Assets/year.png";
import ImageCarousel from "./ContestImagesCarousel";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions";
import { useLayoutEffect } from "react";
import NotFound from "../NotFound";

const specAssets = {
  displacement: ["Capacitate", displacement],
  horsepower: ["Putere", horsepower],
  km: ["Kilometraj", km],
  year: ["An", year],
};

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

export default function ContestPage() {
  const { id } = useParams();

  const contest = useSelector(
    (state) => state.contestsData.filter((contest) => contest._id == id)[0]
  );

  const cart = useSelector((state) => state.cart);

  const ticketDate = new Date(contest?.date);
  const today = new Date();

  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  const remainingTime = ticketDate - today;

  const drawDate = new Date(contest?.drawDate);
  const [ticketNumber, setTicketNumber] = useState(
    cart[contest?._id] ? cart[contest?._id].tickets : 1
  );

  const [timerState, setTimer] = useState({
    days: Math.floor(remainingTime / _day),
    hours: Math.floor((remainingTime % _day) / _hour),
    minutes: Math.floor((remainingTime % _hour) / _minute),
    seconds: Math.floor((remainingTime % _minute) / _second),
    started: false,
    finished: false,
  });

  useEffect(() => {
    setInterval(() => {
      var now = new Date();
      var distance = ticketDate - now;

      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);

      if (parseFloat(distance) > 0) {
        setTimer({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          finished: false,
        });
      } else {
        setTimer({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          finished: true,
        });
      }
    }, 1000);
  }, [contest]);

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const [cartUpdated, setUpdate] = useState(false);

  if (contest) {
    return (
      <motion.div
        className="contest-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {
          <div className="contest-wrapper">
            <ImageCarousel images={contest.images}></ImageCarousel>
            <div className="contest-container">
              <div className="contest-details-container">
                <div className="contest-title-wrapper">
                  <h2>Participă pentru șansa de a câștiga</h2>
                  <h1>{contest.name}</h1>
                  <div className="draw-date-wrapper">
                    <p>
                      Data extragerii:{" "}
                      <span>
                        {drawDate.getDate() +
                          " " +
                          months[drawDate.getMonth()] +
                          " " +
                          drawDate.getFullYear()}
                      </span>
                    </p>
                    <p>
                      Limita tickete: <span>{contest.maxTickets}</span>
                    </p>
                  </div>
                </div>
                <div className="contest-description">
                  <h2>Descriere</h2>
                  <p>{contest.overview}</p>
                </div>
                <div className="contest-specs">
                  <h2>Specificații</h2>
                  <div className="specs-container">
                    {Object.keys(contest.specs).map((key, index) => {
                      return (
                        <div className="spec-wrapper" key={index}>
                          <img src={specAssets[key][1]}></img>
                          <div className="spec-info-wrapper">
                            <p>{specAssets[key][0]}</p>
                            <p>{contest.specs[key]}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="ticket-purchase-container">
                <div className="countdown-container">
                  {remainingTime < 1 ||
                  timerState.finished == true ||
                  contest.totalTickets - contest.soldTickets <= 0 ? (
                    <>
                      <p className="buy-period-over">
                        Înscrierile la acest concurs s-au încheiat.
                        <br />
                        <br /> Data extragerii:
                        <br />
                        {drawDate.getDate() +
                          " " +
                          months[drawDate.getMonth()] +
                          " " +
                          drawDate.getFullYear()}
                        <br />
                        <br />
                        {contest.winner.name != ""
                          ? "Castigător: " + contest.winner.name
                          : "Câștigătorul va fi anunțat curând."}
                        <br />
                        {contest.winner.ticketID != ""
                          ? "#Ticket: " + contest.winner.ticketID
                          : ""}
                      </p>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p>Înscrierile se vor încheia în:</p>
                      <div className="countdown-wrapper">
                        <div className="countdown-item">
                          <p>{timerState.days}</p>
                          <p>Zile</p>
                        </div>
                        <div className="countdown-item">
                          <p>{timerState.hours}</p>
                          <p>Ore</p>
                        </div>
                        <div className="countdown-item">
                          <p>{timerState.minutes}</p>
                          <p>Minute</p>
                        </div>
                        <div className="countdown-item">
                          <p>{timerState.seconds}</p>
                          <p>Secunde</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="tickets-sold-container">
                  <p>Tickete vândute</p>
                  <div className="loading-bar-wrapper">
                    <div>
                      <p>0</p>
                      <p>{contest.totalTickets}</p>
                    </div>
                    <div
                      className="loading-bar"
                      style={{
                        background:
                          "linear-gradient(90deg, #ec6624 " +
                          (100 * contest.soldTickets) / contest.totalTickets +
                          "%, #3b2bb1 " +
                          (100 * contest.soldTickets) / contest.totalTickets +
                          "%) no-repeat",
                      }}
                    ></div>
                    <p>
                      {contest.totalTickets - contest.soldTickets} bilete
                      rămase!
                    </p>
                  </div>
                </div>
                {contest.giveaway.isGiveaway ? (
                  <>
                    <p className="giveaway-prompt">Acest concurs este un Giveaway. <br/> <span>Pentru mai multe detalii vizitați pagina noastră de Instagram.</span></p>
                    <i className="fi fi-brands-instagram" onClick={()=>{window.open('https://www.instagram.com/')}}></i>
                  </>
                ) : (
                  <>
                    <div className="ticket-price-wrapper">
                      <p>${contest.pricePerTicket}</p>
                      <p>Per Ticket</p>
                    </div>
                    {remainingTime < 1 ||
                    timerState.finished == true ||
                    contest.totalTickets - contest.soldTickets <= 0 ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <div className="ticket-number-wrapper">
                          <button
                            onClick={() => {
                              if (inputRef.current.value > 1) {
                                setTicketNumber(ticketNumber - 1);
                                setUpdate(false);
                              }
                            }}
                          >
                            <i className="fi fi-rr-minus-small"></i>
                          </button>
                          <input
                            type="number"
                            ref={inputRef}
                            onBlur={(e) => {
                              if (e.target.value < 1) {
                                setTicketNumber(1);
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value <= contest.maxTickets &&
                                e.target.value > -1 &&
                                e.target.value <=
                                  contest.totalTickets - contest.soldTickets
                              ) {
                                if (!e.target.value) {
                                  setTicketNumber(e.target.value);
                                } else {
                                  setTicketNumber(parseInt(e.target.value));
                                }
                              }
                            }}
                            value={ticketNumber}
                          ></input>
                          <button
                            onClick={() => {
                              if (inputRef.current.value < contest.maxTickets) {
                                setTicketNumber(ticketNumber + 1);
                                setUpdate(false);
                              }
                            }}
                          >
                            <i className="fi fi-rr-plus-small"></i>
                          </button>
                        </div>
                        <p
                          className="cart-updated-confirmation"
                          style={{ display: cartUpdated ? "block" : "none" }}
                        >
                          Coșul tău a fost actualizat cu succes!
                        </p>
                        <button
                          className="buy-tickets-button"
                          onClick={() => {
                            dispatch(
                              addToCart(
                                contest._id,
                                ticketNumber,
                                contest.pricePerTicket,
                                contest.images[0],
                                contest.name,
                                contest.drawDate
                              )
                            );
                            setUpdate(true);
                          }}
                        >
                          Adaugă în coș
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        }
      </motion.div>
    );
  }else{
    return <NotFound/>
  }
}
