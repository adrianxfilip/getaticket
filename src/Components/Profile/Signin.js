import "../../Styles/Registration.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchURL } from "../../settings";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {logIn} from "../../actions"

function RegisterForm(props) {
  const regex =
    /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
  const register = () => {
    if (credentials.password.length < 6 || credentials.password.length > 14) {
      setErrorMessage("Parola trebuie să conțină între 6 si 14 caractere.");
      return;
    }
    if (credentials.password !== credentials.confirmedPassword) {
      setErrorMessage("Parola nu este identică.");
      return;
    }
    if (!regex.test(credentials.phoneNumber)) {
      setErrorMessage("Numărul de telefon este invalid.");
      return;
    }
    changeLoadingState(true);
    fetch(fetchURL + "/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((res) => {
        changeLoadingState(false);
        if (res.success === false) {
          setErrorMessage(res.message);
        }
        if (res.success === true) {
          props.changeForm("registerSuccess");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
    firstName: "",
    secondName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, changeLoadingState] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="signin-form"
      key="register"
    >
      <h1>CREEAZĂ-ȚI UN CONT</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading) {
            register();
          }
        }}
      >
        <div className="form-group">
          <label>Nume</label>
          <input
            type="text"
            placeholder="Nume"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                firstName: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label>Prenume</label>
          <input
            type="text"
            placeholder="Prenume"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                secondName: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label>Număr de telefon</label>
          <input
            type="text"
            placeholder="Telefon"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                phoneNumber: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Adresă de email"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                email: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label>Parolă</label>
          <input
            type="password"
            placeholder="Parolă"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label>Confirmă parola</label>
          <input
            type="password"
            placeholder="Parolă"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                confirmedPassword: e.target.value,
              })
            }
          ></input>
        </div>
        {errorMessage === "" ? (
          ""
        ) : (
          <p className="error-message">{errorMessage}</p>
        )}
        <button type="submit" autoFocus>
          {isLoading ? (
            <i className="fi fi-rr-spinner"></i>
          ) : (
            "Înregistrează-te"
          )}
        </button>
        <p style={{ textAlign: "center" }}>
          Ai deja cont? <br />
          <span
            onClick={() => {
              props.changeForm("signin");
            }}
          >
            Intră în cont.
          </span>
        </p>
      </form>
    </motion.div>
  );
}

function SigninForm(props) {
  const dispatch = useDispatch()
  const signin = () => {
    changeLoadingState(true);
    fetch(fetchURL + "/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((res) => {
        changeLoadingState(false);
        if (res.success === false) {
          setErrorMessage(res.message);
        }
        if (res.success === true) {
          var now = new Date().getTime();
          dispatch(logIn(res.token, now, res.userData, res.userContests))
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isLoading, changeLoadingState] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="signin-form"
      key="signin"
    >
      <h1>Intră în cont</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signin();
        }}
      >
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Adresă de email"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                email: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label>Parolă</label>
          <input
            type="password"
            placeholder="Parolă"
            required
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
          ></input>
        </div>
        {errorMessage === "" ? (
          ""
        ) : (
          <p className="error-message">{errorMessage}</p>
        )}
        <p>
          <span>Ai uitat parola?</span>
        </p>
        <button type="submit" autoFocus>
          {isLoading ? <i className="fi fi-rr-spinner"></i> : "Log In"}
        </button>
        <p style={{ textAlign: "center" }}>
          Nu ai cont? <br />
          <span
            onClick={() => {
              props.changeForm("register");
            }}
          >
            Înregistrează-te.
          </span>
        </p>
      </form>
    </motion.div>
  );
}

function RegisterSuccess(props) {
  return (
    <>
      <div className="register-success-wrapper">
        <p>
          Contul tău a fost creat cu success. În scurt timp vei primi un email
          pentru verificarea contului.
        </p>
        <button
          onClick={() => {
            props.changeForm("signin");
          }}
        >
          Intră în cont
        </button>
      </div>
    </>
  );
}

function Signin(props) {
  const [activeForm, changeForm] = useState("signin");

  return (
    <AnimatePresence mode="wait" initial={false}>
      {activeForm === "signin" ? (
        <SigninForm
          changeForm={changeForm}
          key="signin"
        />
      ) : activeForm === "register" ? (
        <RegisterForm changeForm={changeForm} key="register" />
      ) : (
        <RegisterSuccess changeForm={changeForm} key="changeForm" />
      )}
    </AnimatePresence>
  );
}

export default Signin;
