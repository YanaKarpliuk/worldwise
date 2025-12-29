import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext()

const BASE_URL = "http://localhost:8000"

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

// Reducers should be pure functions, so no fetch requests here.
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true
      }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'cities/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      throw new Error("Unknown action")
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" })
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: "cities/loaded", payload: data })
      } catch (err) {
        dispatch({ type: "rejected", payload: 'There was an error loading cities...' })
        throw new Error(err)
      }
    }

    fetchCities()
  }, [])

  async function getCity(id) {
    if (Number(id) === currentCity.id) return

    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      dispatch({ type: "city/loaded", payload: data })
    } catch (err) {
      dispatch({ type: "rejected", payload: 'There was an error loading the city...' })
      throw new Error(err)
    }
  }

  async function createCity(city) {
    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()

      // Keep the UI state in sync with the remote state.
      // A better way to do it is with the React Query, but I don't know this at the moment.
      dispatch({ type: "cities/created", payload: data })
    } catch (err) {
      dispatch({ type: "rejected", payload: 'There was an error creating the city...' })
      throw new Error(err)
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" })
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" })
      dispatch({ type: "cities/deleted", payload: id })
    } catch (err) {
      dispatch({ type: "rejected", payload: 'There was an error deleting the city...' })
      throw new Error(err)
    }
  }

  return (
      <CitiesContext.Provider
          value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity
          }}
      >
        {children}
      </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error('CitiesContext has been used outside of the CitiesProvider')
  return context
}

export { CitiesProvider, useCities }
