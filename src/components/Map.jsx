import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useCities } from "../contexts/CitiesContext";

import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Map.module.css";
// import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { cities } = useCities();

  const [lat, lng] = useUrlPosition();

  // const mapPosition = [lat, lng];
  const {
    position: geolocationPosition,
    // isLoading: isLoadingPosition,
    // getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {/* {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )} */}
      <MapContainer
        // center={[lat, lng]}
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
              <div className={styles.city}>
                <div className={styles.row}>
                  <h6>City name</h6>
                  <h3>
                    <span>{city.emoji}</span> {city.cityName}
                  </h3>
                </div>

                <div className={styles.row}>
                  <h6>You went to {city.cityName} on</h6>
                  <p>{formatDate(city.date || null)}</p>
                </div>

                {city.notes && (
                  <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{city.notes}</p>
                  </div>
                )}

                <div className={styles.row}>
                  <h6>Learn more</h6>
                  <a
                    href={`https://en.wikipedia.org/wiki/${city.cityName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Check out {city.cityName} on Wikipedia &rarr;
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <Marker position={mapPosition}>
          <Popup>Check down for location info</Popup>
        </Marker>

        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
