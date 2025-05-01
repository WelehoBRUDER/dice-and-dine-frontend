import {useEffect, useState} from "react";
import Button from "../Button";

/**
 *
 * @param {number} length - The length of the reservation in hours.
 * @param {function} setLength - Function to set the length of the reservation.
 * @param {Array} arrivalTimes - Array of available arrival times.
 * @param {string} arrival - The selected arrival time.
 * @param {object} info - Object containing reservation lengths and restaurant open times.
 * @param {string} title - The title for the reservation length selection.
 * @returns
 */
const ReservationLength = ({length, setLength, arrival, info, title}) => {
  const [lengths, setLengths] = useState(null);
  const {reservationLengths: len, restaurantOpen: openTimes} = info;

  useEffect(() => {
    if (arrival) {
      const availableLengths = len.filter((length) => {
        const arrivalTime = parseFloat(arrival);
        const endTime = arrivalTime + length;
        return arrivalTime >= openTimes.open && endTime <= openTimes.close;
      });
      setLengths(availableLengths);
    }
  }, [arrival]);

  return (
    <>
      <h2>{title}</h2>
      <div className="time-selection flex-row center wrap">
        {lengths?.map((time, index) => (
          <Button
            key={index}
            className={`btn-smaller uniform ${
              length === time ? "selected" : ""
            }`}
            onClick={() => {
              setLength(time);
            }}
          >
            {time} h
          </Button>
        ))}
      </div>
    </>
  );
};

export default ReservationLength;
