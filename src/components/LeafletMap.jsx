import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useLanguage} from "../context/LanguageContext";
import useRestaurantInfo from "../hooks/useRestaurantInfo";
import LoadingWheel from "./LoadingWheel";
import MapInvalidator from "./MapInvalidator";

const LeafletMap = ({children}) => {
  const [position, setPosition] = useState(null); // Default position (latitude, longitude)
  const {lang} = useLanguage();
  const {info, loading} = useRestaurantInfo("en"); // Fetch restaurant info in English

  useEffect(() => {
    if (info.length > 0) {
      const {latitude, longitude} = info[0];
      console.log(latitude, longitude);
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
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
