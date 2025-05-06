import {useMap} from "react-leaflet";
import {useEffect} from "react";

/**
 * Component to invalidate the map size and center the map view to a specific position.
 * Invalidation prevents the map from being cut off or not displaying correctly when the size changes.
 *
 * @param {Array} position - The position to set the map view to. It should be an array of two numbers [latitude, longitude].
 */
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
