import {useEffect, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import ScooterIcon from "../../assets/icons/scooter.svg";
import BusIcon from "../../assets/icons/bus.svg";
import L from "leaflet";

const MapTransportationMarkers = ({data}) => {
  const [transportationStops, setTransportationStops] = useState([]);
  const [transportationScooters, setTransportationScooters] = useState([]);
  useEffect(() => {
    const {scooters, stops} = data;
    if (stops) {
      const stopNodes = stops.data.nearest.edges;
      setTransportationStops(stopNodes);
    }
    if (scooters) {
      const scooterNodes = scooters.data.nearest.edges;
      setTransportationScooters(scooterNodes);
    }
  }, [data]);
  const iconSize = [32, 32];
  const iconAnchor = [16, 16];

  const LBusIcon = new L.divIcon({
    className: "",
    html: `<div class="material-icon-wrapper blue"><img src=${BusIcon} class="material-icons"/></div>`,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const LScooterIcon = new L.divIcon({
    className: "",
    html: `<div class="material-icon-wrapper gold"><img src=${ScooterIcon} class="material-icons"/></div>`,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      {transportationStops.map((stop) => {
        const {node} = stop;
        const {lon, lat} = node.place;
        if (!lat || !lon) return null; // Skip if coords are not defined
        return (
          <Marker key={node.distance} position={[lat, lon]} icon={LBusIcon}>
            <Popup>
              {node.place.name}
              <br></br>
              {node.place.code}
            </Popup>
          </Marker>
        );
      })}
      {transportationScooters.map((scooter) => {
        const {node} = scooter;
        const {lon, lat} = node.place;
        if (!lat || !lon) return null; // Skip if coords are not defined
        return (
          <Marker key={node.distance} position={[lat, lon]} icon={LScooterIcon}>
            <Popup>{node.place.name}</Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MapTransportationMarkers;
