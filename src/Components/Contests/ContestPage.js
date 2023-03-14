import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../../Styles/ContestPage.scss";
import displacement from "../../Assets/displacement.png";
import horsepower from "../../Assets/horsepower.png";
import km from "../../Assets/km.png";
import year from "../../Assets/year.png";

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

  const contests = useSelector((state) => state.contestsData);

  const [contestData, setContestData] = useState({
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
  });

  const [contestDate, setContestDate] = useState(new Date("2022-03-25"));

  const [timerState, setTimer] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (contests) {
      var contest = contests.filter((contest) => contest._id === id)[0]
      setContestData(contest);
      setPercentage((100 * contest.soldTickets) / contest.totalTickets);
      setContestDate(new Date(contest.date));
    }
  }, [contests]);

  function timerCountdown(contestDate, setTimer, timerState) {
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var now = new Date();
    var distance = contestDate - now;
    if (distance < 0) {
      setTimer({
        ...timerState,
        finished: true,
      });

      return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    setTimer({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      finished: timerState.finished,
    });
  }

  useEffect(() => {
    if (contestDate.getFullYear() != "2022") {
      timerCountdown(contestDate, setTimer, timerState);
      setInterval(() => {
        timerCountdown(contestDate, setTimer, timerState);
      }, 1000);
    }
  }, [contestDate]);

  return (
    <div className="contest-page">
      <div className="contest-container">
        <div className="contest-details-container">
          <div className="contest-title-wrapper">
            <h2>Participă pentru șansa de a câștiga</h2>
            <h1>{contestData.name}</h1>
            <div className="draw-date-wrapper">
              <p>
                Data extragerii:{" "}
                <span>
                  {contestDate.getDay() +
                    " " +
                    months[contestDate.getMonth()] +
                    " " +
                    contestDate.getFullYear()}
                </span>
              </p>
              <p>
                Limita tickete: <span>{contestData.maxTickets}</span>
              </p>
            </div>
          </div>
          <div className="contest-description">
            <h2>Descriere</h2>
            <p>{contestData.overview}</p>
          </div>
          <div className="contest-specs">
            <h2>Specificații</h2>
            <div className="specs-container">
              {Object.keys(contestData.specs).map((key, index) => {
                return (
                  <div className="spec-wrapper" key={index}>
                    <img src={specAssets[key][1]}></img>
                    <div className="spec-info-wrapper">
                      <p>{specAssets[key][0]}</p>
                      <p>{contestData.specs[key]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ticket-purchase-container">
          <div className="countdown-container">
            <p>Acest concurs se încheie în:</p>
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
          </div>
          <div className="tickets-sold-container">
            <p>Tickete vândute</p>
            <div className="loading-bar-wrapper">
              <div>
                <p>0</p>
                <p>{contestData.totalTickets}</p>
              </div>
              <div
                className="loading-bar"
                style={{
                  background:
                    "linear-gradient(90deg, #ec6624 " +
                    percentage +
                    "%, #3b2bb1 " +
                    percentage +
                    "%) no-repeat",
                }}
              ></div>
              <p>
                {contestData.totalTickets - contestData.soldTickets} bilete
                rămase!
              </p>
            </div>
          </div>
          <div className="ticket-price-wrapper">
            <p>${contestData.pricePerTicket}</p>
            <p>Per Ticket</p>
          </div>
        </div>
      </div>
    </div>
  );
}
