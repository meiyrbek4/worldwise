import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./PopupMobile.module.css";
import { convertToEmoji } from "./Form";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function PopupMobile({ isSidebar, setIsSidebar }) {
  const [cityName, setCityName] = useState("");
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingPosition(true);
          setErrorMsg("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          // console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setErrorMsg(err.message);
        } finally {
          setIsLoadingPosition(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  //   if (isLoadingPosition) return <Spinner />;

  return (
    <div className={`${styles.popup} ${isSidebar && styles.mobile}`}>
      {isLoadingPosition ? (
        <Spinner />
      ) : (
        <>
          <div>
            {lat && lng && !errorMsg ? (
              <p>{`Location: ${emoji} ${country}, ${cityName}`}</p>
            ) : null}
            {!lat && !lng && (
              <Message message="Start by clicking somewhere on the map" />
            )}
            {errorMsg && <Message message={errorMsg} />}
          </div>
          <div>
            <Button type="primary" onClick={() => setIsSidebar(true)}>
              go to add form
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default PopupMobile;
