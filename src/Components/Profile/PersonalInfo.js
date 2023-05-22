import "../../Styles/UserDashboard.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchURL } from "../../settings";
import { useEffect, useState } from "react";
import { loadUserData } from "../../actions";
import { Link } from "react-router-dom";

function PersonalDetailsCard(props) {
  const userData = useSelector((state) => state.userData);

  const userID = useSelector((state)=>state.loggedID);

  const [data, setData] = useState({
    firstName: userData.firstName,
    secondName: userData.secondName,
    phoneNumber: userData.phoneNumber,
    email: userData.email,
  });

  const [errorMessage,setErrorMessage] = useState("")

  const submitChanges = () => {
    const regex =
      /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
    if (!regex.test(data.phoneNumber)) {
      setErrorMessage("Numărul de telefon este invalid.");
      return;
    }
    fetch(fetchURL + "/changePersonalInfo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        data : data,
        id : userID
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success == true){
          window.location.href = "/profile"
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="info-card">
      <div>
        <h2>Informații Personale</h2>
        <button
          type="submit"
          form="personal-info-form"
          className="edit-info-btn"
        >
          <i className="fi fi-rr-disk"></i>Salvează
        </button>
      </div>
      <p className="error-message">{errorMessage}</p>
      <form
        id="personal-info-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitChanges();
        }}
      >
        <div className="form-group">
          <label>Nume</label>
          <input
            type="text"
            required
            onChange={(e) =>
              setData({
                ...data,
                firstName: e.target.value,
              })
            }
            defaultValue={data.firstName}
          ></input>
        </div>
        <div className="form-group">
          <label>Prenume</label>
          <input
            type="text"
            required
            onChange={(e) =>
              setData({
                ...data,
                secondName: e.target.value,
              })
            }
            defaultValue={data.secondName}
          ></input>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            defaultValue={data.email}
          ></input>
        </div>
        <div className="form-group">
          <label>Numar de telefon</label>
          <input
            type="number"
            required
            onChange={(e) =>
              setData({
                ...data,
                phoneNumber: e.target.value,
              })
            }
            defaultValue={data.phoneNumber}
          ></input>
        </div>
      </form>
    </div>
  );
}

function AddressCard(props) {
  const userData = useSelector((state) => state.userData);

  const userID = useSelector((state)=>state.loggedID);

  const [data, setData] = useState({
    addressOne: userData.addressOne,
    addressTwo: userData.addressTwo,
    county: userData.county,
    city: userData.city,
    zipCode: userData.zipCode
  });

  const submitChanges = () => {
    fetch(fetchURL + "/changeAddress", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        data : data,
        id : userID
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success == true){
          window.location.href = "/profile"
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="info-card">
      <div>
        <h2>Adresă</h2>
        <button
          type="submit"
          form="address-info-form"
          className="edit-info-btn"
        >
          <i className="fi fi-rr-disk"></i>Salvează
        </button>
      </div>
      <form
        id="address-info-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitChanges();
        }}
      >
        <div className="form-group">
          <label>Strada și numărul</label>
          <input
            type="text"
            required
            onChange={(e) =>
              setData({
                ...data,
                addressOne: e.target.value,
              })
            }
            defaultValue={data.addressOne}
          ></input>
        </div>
        <div className="form-group">
          <label>Bloc și apartament (opțional)</label>
          <input
            type="text"
            onChange={(e) =>
              setData({
                ...data,
                addressTwo: e.target.value,
              })
            }
            defaultValue={data.addressTwo}
          ></input>
        </div>
        <div className="form-group">
          <label>Oraș</label>
          <input
            type="text"
            required
            onChange={(e) =>
              setData({
                ...data,
                city: e.target.value,
              })
            }
            defaultValue={data.city}
          ></input>
        </div>
        <div className="form-group">
          <label>Cod poștal</label>
          <input
            type="number"
            required
            onChange={(e) =>
              setData({
                ...data,
                zipCode: e.target.value,
              })
            }
            defaultValue={data.zipCode}
          ></input>
        </div>
        <div className="form-group">
          <label>Județ</label>
          <input
            type="text"
            required
            onChange={(e) =>
              setData({
                ...data,
                county: e.target.value,
              })
            }
            defaultValue={data.county}
          ></input>
        </div>
      </form>
    </div>
  );
}

function PersonalInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="personal-info-container"
    >
      <PersonalDetailsCard />
      <AddressCard />
    </motion.div>
  );
}

export default PersonalInfo;
