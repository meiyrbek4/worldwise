import { Link } from "react-router-dom";

import { useCities } from "../contexts/CitiesContext";

import styles from "./CityItem.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city, isDeleting }) {
  const { emoji, cityName, date, id, position } = city;
  const { currentCity, deleteCity, isLoadingDelete } = useCities();

  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      {isDeleting && isLoadingDelete ? (
        <Spinner />
      ) : (
        <Link
          className={`${styles.cityItem} ${
            currentCity.id === id ? styles["cityItem--active"] : ""
          }`}
          to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>

          <time className={styles.date}>{formatDate(date)}</time>
          <button
            className={styles.deleteBtn}
            onClick={(e) => handleDeleteCity(e)}
          >
            &times;
          </button>
        </Link>
      )}
    </li>
  );
}

export default CityItem;
