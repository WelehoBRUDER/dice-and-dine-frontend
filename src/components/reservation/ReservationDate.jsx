import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ReservationDate = ({date, setDate, title, locale}) => {
  return (
    <div className="reservation-date flex-column center">
      <h2>{title}</h2>
      <Calendar
        onChange={(value) => {
          setDate(value);
        }}
        value={date}
        className="react-calendar"
        locale={locale}
        minDate={new Date()}
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      />
    </div>
  );
};

export default ReservationDate;
