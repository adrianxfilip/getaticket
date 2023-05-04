import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollTop";
import Layout from "./Components/Layout";
import Footer from "./Components/Footer";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { useLayoutEffect } from "react";
import { fetchURL } from "./settings";
import { useSelector, useDispatch } from "react-redux";
import { logIn, loadContestsData } from "./actions";

function fecthContestsData(dispatch) {
  fetch(fetchURL + "/getContests", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(loadContestsData(res.contestsData))
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  const dispatch = useDispatch()
  var setupTime = useSelector((state) => state.sessionID);
  var sessionID = useSelector((state) => state.loggedID)
  useLayoutEffect(() => {
    fecthContestsData(dispatch);
    var hours = 1; // to clear the localStorage after 1 hour
    // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    if (now - setupTime < hours * 60 * 60 * 1000) {
      dispatch(logIn(sessionID, now))
    }
    if (now - setupTime > hours * 60 * 60 * 1000) {
      dispatch(logIn("", ""))
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
