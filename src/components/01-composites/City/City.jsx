import styles from "./City.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../../../contexts/CitiesContext.jsx";
import Button from "../../00-elements/Button/Button";
import { useEffect } from "react";
import Spinner from "../../00-elements/Spinner/Spinner.jsx";

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date))
}

export default function City() {
  const {id} = useParams()
  const { getCity, currentCity, isLoading } = useCities();
  const navigate = useNavigate()

  useEffect(() => {
    getCity(id)
  }, [id])

  if (isLoading) return <Spinner />;

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

        <Button
            type={'outline'}
            onClick={() => navigate(-1)}
            ariaLabel={'Back'}
        >
          <><span>&larr;</span> Back</>
        </Button>
      </div>
  );
}
