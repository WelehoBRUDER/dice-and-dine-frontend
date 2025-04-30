import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ReservationDate = ({date, setDate, title, locale}) => {
  return (
    <div className="reservation-date">
      <h2>{title}</h2>
      <Calendar
        onChange={(value) => {
          setDate(value);
        }}
        value={date}
        className="react-calendar"
        locale={locale}
        minDate={new Date()}
      />
    </div>
  );
};

export default ReservationDate;
