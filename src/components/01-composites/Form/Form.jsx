import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../../hooks/useUrlPosition.js";
import styles from "./Form.module.scss";
import Button from "../../00-elements/Button/Button";
import Spinner from "../../00-elements/Spinner/Spinner.jsx";
import Message from "../Message/Message";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryEmoji, setCountryEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const navigate = useNavigate()
  const [lat, lng] = useUrlPosition()

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

  function handleBack(e) {
    e.preventDefault()
    navigate(-1)
  }

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsGeocodingLoading(true)
        setGeocodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) throw new Error("No city found here. Click somewhere else.")

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setCountryEmoji(convertToEmoji(data.countryCode))
      } catch(err) {
        setGeocodingError(err.message)
      } finally {
        setIsGeocodingLoading(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  if (isGeocodingLoading) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError}/>;

  return (
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
          />
           <span className={styles.flag}>{countryEmoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button
              onClick={() => {}}
              ariaLabel={"Add the city"}
              type={"primary"}
              children={"Add"}
          />
          <Button
              onClick={handleBack}
              ariaLabel={"Close the form"}
              type={"outline"}
              children={<><span>&larr;</span> Back</>}
          />
        </div>
      </form>
  );
}
