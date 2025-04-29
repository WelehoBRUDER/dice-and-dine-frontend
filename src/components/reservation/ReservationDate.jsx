import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ReservationDate = ({date}) => {
  return (
    <div className="reservation-date">
      <h2>Reservation Date</h2>
      <Calendar
        onChange={() => {}}
        value={new Date(date)}
        className="react-calendar"
        locale="en-US"
        minDate={new Date()}
      />

      <p>{date.toLocaleDateString("fi-FI")}</p>
    </div>
  );
};

export default ReservationDate;
