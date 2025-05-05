import {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useLanguage} from "../context/LanguageContext";

const LeafletMap = () => {
  const [position, setPosition] = useState([61.471446, 23.788578]); // Default position (latitude, longitude)
  const {lang} = useLanguage();
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      className="leaflet-container"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{lang("title")}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
