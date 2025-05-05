import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useLanguage} from "../context/LanguageContext";
import useRestaurantInfo from "../hooks/useRestaurantInfo";
import LoadingWheel from "./LoadingWheel";
import MapInvalidator from "./MapInvalidator";
import MapTransportationMarkers from "./MapTransportationMarkers";
/**
 * Component that renders a Leaflet map with a marker and popup.
 * It fetches the restaurant's latitude and longitude from the API and displays it on the map.
 *
 * @param {Object} transportationInfo - Information about transportation to be displayed on the map.
 * @param {any} children - Child elements to be rendered inside the map component.
 * @returns
 */
const LeafletMap = ({transportationInfo, children}) => {
  const [position, setPosition] = useState(null); // Default position (latitude, longitude)
  const {lang} = useLanguage();
  const {info, loading} = useRestaurantInfo("en"); // Fetch restaurant info in English

  useEffect(() => {
    if (info.length > 0) {
      const {latitude, longitude} = info[0];
      setPosition([latitude, longitude]); // Update position with fetched coordinates
    }
  }, [info]);

  return (
    <div className="map-embed flex-column ">
      {children}
      {loading || !position ? (
        <LoadingWheel />
      ) : (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>{lang("restaurant_title")}</Popup>
          </Marker>
          <MapInvalidator position={position} />
          {transportationInfo && (
            <MapTransportationMarkers data={transportationInfo} />
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
