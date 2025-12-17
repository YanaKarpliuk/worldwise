import Spinner from "../../00-elements/Spinner/Spinner";
import styles from "./CityList.module.scss";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
// import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  // const { cities, isLoading } = useCities();
  const cities = []
  const isLoading = false

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
