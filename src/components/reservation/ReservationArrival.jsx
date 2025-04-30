import {useEffect, useState} from "react";
import Button from "../Button";

/**
 *
 * @param {number} arrival - The selected arrival time.
 * @param {function} setArrival - Function to set the arrival time.
 * @param {Date} date - The selected date for the reservation.
 * @param {object} info - Object containing restaurant open times.
 * @param {string} title - The title for the reservation time selection.
 * @returns
 */
const ReservationTime = ({arrival, setArrival, date, info, title}) => {
  const {restaurantOpen: openTimes} = info;
  const [arrivalTimes, setArrivalTimes] = useState(null);

  useEffect(() => {
    const viableTimes = [];

    let start = openTimes.open;
    let end = openTimes.close;

    if (date.toDateString() === new Date().toDateString()) {
      start = date.getHours() + 1; // Start from the next hour
    }
    for (let i = start; i < end; i += 0.5) {
      viableTimes.push(i);
    }

    setArrivalTimes(
      viableTimes.map((time) => {
        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
      })
    );
  }, [date]);

  return (
    <div className="reservation-time">
      <h2>{title}</h2>
      {arrivalTimes && arrivalTimes.length === 0 && (
        <p>No times available for selected day</p>
      )}
      {arrivalTimes && arrivalTimes.length > 0 && (
        <div className="time-selection flex-row center wrap">
          {arrivalTimes.map((time, index) => (
            <Button
              key={index}
              className={`btn-smaller uniform ${
                arrival === time ? "selected" : ""
              }`}
              onClick={() => {
                setArrival(time);
              }}
            >
              {time}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationTime;
