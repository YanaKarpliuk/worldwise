import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.scss";
import { useEffect, useState } from "react";
import { useCities } from "../../../contexts/CitiesContext";
import { useGeolocation } from "../../../hooks/useGeolocation.js";
import Button from "../../00-elements/Button/Button";
import { useUrlPosition } from "../../../hooks/useUrlPosition.js";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geolocationPosition
  } = useGeolocation()
  const [lat, lng] = useUrlPosition()

  // Change mapPosition to selected city.
  useEffect(() => {
        if (lat && lng) setMapPosition([Number(lat), Number(lng)]);
      }, [lat, lng]
  );

  // Change mapPosition to user geolocation.
  useEffect(() => {
        if (geolocationPosition)
          setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      },
      [geolocationPosition]
  );

  return (
      <div className={styles.mapContainer}>
        {!geolocationPosition && (
            <div className='btn-wrapper'>
              <Button type="primary" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
              </Button>
            </div>
        )}

        <MapContainer
            center={mapPosition}
            zoom={6}
            scrollWheelZoom={true}
            className={styles.map}
        >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
              <Marker
                  position={[city.position.lat, city.position.lng]}
                  key={city.id}
              >
                <Popup>
                  <span>{city.emoji}</span> <span>{city.cityName}</span>
                </Popup>
              </Marker>
          ))}

          {/* Center the map to the currently selected city */}
          <ChangeCenter position={mapPosition}/>

          {/* Create map event to add position values to the form */}
          <DetectClick/>

        </MapContainer>
      </div>
  );
}

function ChangeCenter({ position }) {
  // Get current instance of the map.
  const map = useMap();
  map.setView(position);
  // This is a component, so it needs to return something.
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
