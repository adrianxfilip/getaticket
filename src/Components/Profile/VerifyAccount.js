import "../../Styles/VerifyAccount.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchURL } from "../../settings";

export default function VerifyAccount() {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
    console.log(id)
    fetch(fetchURL + "/verifyAccount", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userID: id }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            setLoading(false)
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, [])

  return (
    <div className="verify-account-wrapper">
      {isLoading ? <i className="fi fi-rr-spinner"></i> : <>
        <p>Contul dumneavoastră a fost verificat cu success.</p>
      </>}
    </div>
  );
}
