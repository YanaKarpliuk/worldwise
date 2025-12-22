import styles from "./City.module.scss";
import { useParams } from "react-router-dom";

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date))
}

export default function City({cities}) {
  const {id} = useParams()

  const currentCity = cities.length && cities.filter(city => city.id === id)[0]
  const {cityName, emoji, date, notes} = currentCity;

  return (
      <div className={styles.city}>
        <div className={styles.row}>
          <div className={styles.label}>City name</div>
          <h2>
            <span>{emoji}</span> {cityName}
          </h2>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>You went to {cityName} on</div>
          <p>{formatDate(date || null)}</p>
        </div>

        {notes && (
            <div className={styles.row}>
              <div className={styles.label}>Your notes</div>
              <p>{notes}</p>
            </div>
        )}

        <div className={styles.row}>
          <div className={styles.label}>Learn more</div>
          <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>

        {/*<div>*/}
        {/*  <ButtonBack />*/}
        {/*</div>*/}
      </div>
  );
}
