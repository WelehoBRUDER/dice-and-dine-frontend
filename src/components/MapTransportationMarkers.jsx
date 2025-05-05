import {useEffect, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import ScooterIcon from "../assets/icons/scooter.svg";
import BusIcon from "../assets/icons/bus.svg";

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

  return (
    <>
      {transportationStops.map((stop) => {
        const {node} = stop;
        const {lon, lat} = node.place;
        if (!lat || !lon) return null; // Skip if coords are not defined
        return (
          <Marker key={node.distance} position={[lat, lon]} icon={BusIcon}>
            <Popup>{node.place.name}</Popup>
          </Marker>
        );
      })}
      {transportationScooters.map((scooter) => {
        const {node} = scooter;
        const {lon, lat} = node.place;
        if (!lat || !lon) return null; // Skip if coords are not defined
        return (
          <Marker key={node.distance} position={[lat, lon]} icon={ScooterIcon}>
            <Popup>{node.place.name}</Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MapTransportationMarkers;
