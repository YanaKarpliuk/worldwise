import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlPosition } from "../../../hooks/useUrlPosition.js";
import { useCities } from "../../../contexts/CitiesContext.jsx";
import styles from "./Form.module.scss";
import Button from "../../00-elements/Button/Button";
import Spinner from "../../00-elements/Spinner/Spinner.jsx";
import Message from "../Message/Message";

const initialState = {
  status: "loading",
  cityName: "",
  country: "",
  countryEmoji: "",
  geocodingError: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        cityName: action.payload.cityName,
        country: action.payload.country,
        countryEmoji: action.payload.countryEmoji,
        status: "ready"
      }
    case "dataFailed":
      return {
        ...state,
        status: "error",
        geocodingError: action.payload
      }
    case "setCity":
      return {
        ...state,
        cityName: action.payload
      }
    default:
      throw new Error("Action unknown")
  }
}

function convertToEmoji(countryCode) {
  const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate()
  const [lat, lng] = useUrlPosition()
  const { createCity, isLoading } = useCities()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { status, cityName, country, countryEmoji, geocodingError } = state

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

  function handleBack(e) {
    e.preventDefault()
    navigate(-1)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!cityName && !date) return;

    // id will be created by the server
    const newCity = {
      cityName,
      country,
      emoji: countryEmoji,
      date,
      notes,
      position: { lat, lng },
    }

    await createCity(newCity);
    navigate("/app")
  }

  useEffect(() => {
    if (!lat && !lng) {
      dispatch({ type: "dataFailed", payload: "Start by clicking somewhere on the map." })
      return
    }

    async function fetchCityData() {
      try {
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) throw new Error("No city found here. Click somewhere else.")

        dispatch({
          type: "dataReceived",
          payload: {
            cityName: data.city || data.locality || "",
            country: data.countryName,
            countryEmoji: convertToEmoji(data.countryCode)
          }
        })
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message })
      }
    }

    fetchCityData()
  }, [lat, lng])

  if (status === "loading") return <Spinner/>;

  if (status === "error") return <Message message={geocodingError}/>;

  return (
      <form
          className={`${styles.form} ${isLoading ? styles.loading : ""}`}
          onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
              id="cityName"
              onChange={(e) => dispatch({ type: "setCity", payload: e.target.value })}
              value={cityName}
          />
          <span className={styles.flag}>{countryEmoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <DatePicker
              id="date"
              onChange={(e) => setDate(e)}
              selected={date}
              dateFormat="dd/MM/yyyy"
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
