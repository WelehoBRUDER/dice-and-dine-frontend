import {useEffect, useState} from "react";

const ReservationTime = ({
  arrival,
  length,
  setArrival,
  setLength,
  date,
  info,
}) => {
  const {reservationLengths: len, restaurantOpen: openTimes} = info;
  const [arrivalTimes, setArrivalTimes] = useState(null);
  const [lengths, setLengths] = useState(null);

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

  useEffect(() => {
    if (arrivalTimes) {
      const availableLengths = len.filter((length) => {
        const arrivalTime = parseFloat(arrival);
        const endTime = arrivalTime + length;
        return arrivalTime >= openTimes.open && endTime <= openTimes.close;
      });
      setLengths(availableLengths);
    }
  }, [arrivalTimes, arrival]);

  return (
    <div className="reservation-time">
      <h2>Reservation Time</h2>
      {arrivalTimes && arrivalTimes.length === 0 && <p>No times available</p>}
      {arrivalTimes && arrivalTimes.length > 0 && (
        <div className="time-selection">
          <label htmlFor="arrival-time">Arrival Time:</label>
          <select
            id="arrival-time"
            value={arrival}
            style={{backgroundColor: "black"}}
            onChange={(e) => setArrival(e.target.value)}
          >
            {arrivalTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>

          <label htmlFor="reservation-length">Reservation Length:</label>
          <select
            id="reservation-length"
            value={length}
            style={{backgroundColor: "black"}}
            onChange={(e) => setLength(e.target.value)}
          >
            {lengths?.map((length, index) => (
              <option key={index} value={length}>
                {length} hours
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ReservationTime;
