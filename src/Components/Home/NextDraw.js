import "../../Styles/NextDraw.scss";
import { useSelector } from "react-redux";

export default function NextDraw() {

  const nextContest = useSelector(
    (state) => state.contestsData
  );

  console.log(nextContest)

  return (
    <div className="next-draw">
      <p>
        Următoarea<br/>extragere
        <br />
        <span>Cumpără un ticket și caștigă</span>
      </p>
      <p>
        Data extragerii
        <br /><span>1 Aprilie 2023</span>
      </p>
      <button>
        {" "}
        <i className="fi fi-rs-ticket alt"></i>
        Cumpără ticket
      </button>
    </div>
  );
}
