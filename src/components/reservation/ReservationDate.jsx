import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ReservationDate = ({date, setDate, title, locale}) => {
  return (
    <div className="reservation-date">
      <h2>{title}</h2>
      <Calendar
        onChange={() => {}}
        value={new Date(date)}
        className="react-calendar"
        locale={locale}
        minDate={new Date()}
        onClickDay={(value) => {
          setDate(value);
        }}
      />

      <p>{date.toLocaleDateString("fi-FI")}</p>
    </div>
  );
};

export default ReservationDate;
