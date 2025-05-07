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

      // Add a small delay to ensure the map has fully rendered before calling invalidateSize
      setTimeout(() => {
        map.invalidateSize();
      }, 100); // Slight delay (100ms) ensures the layout is settled
    }
  }, [position, map]);

  return null; // This component doesn't render anything itself
};

export default MapInvalidator;
