import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

/**
 * Component to display a reservation date calendar.
 * Uses the react-calendar library to allow users to select a date.
 *
 * @param {Date} date - The date to be displayed in the calendar.
 * @param {function} setDate - Function to set the selected date.
 * @param {string} title - The title for the calendar component.
 * @param {string} locale - The locale for the calendar display.
 * @returns
 */
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
