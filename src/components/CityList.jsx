import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading, deleteId } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={"Add new city in your list"} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} isDeleting={deleteId === city.id} />
      ))}
    </ul>
  );
}

export default CityList;
