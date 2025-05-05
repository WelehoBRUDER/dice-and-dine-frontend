import {useMap} from "react-leaflet";
import {useEffect} from "react";

const MapInvalidator = ({position}) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), {animate: true});
      map.invalidateSize(); // Invalidate the map size to ensure it renders correctly
    }
  }, [position, map]);

  return null; // This component doesn't render anything itself
};

export default MapInvalidator;
