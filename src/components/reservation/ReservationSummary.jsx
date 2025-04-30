import LoadingWheel from "../LoadingWheel";
import ResultWindow from "../ResultWindow";
import Button from "../Button.jsx";
import {useLanguage} from "../../context/LanguageContext.jsx";

/**
 *
 * @param {Date} date - The selected date for the reservation.
 * @param {string} arrival - The selected arrival time for the reservation.
 * @param {number} length - The length of the reservation in hours.
 * @param {Array} tables - The selected tables for the reservation.
 * @param {string} title - The title for the reservation summary.
 * @returns
 */
const ReservationSummary = ({date, arrival, length, tables, title}) => {
  const {lang} = useLanguage();
  return (
    <div className="summary">
      <h2>{title}</h2>
      <div className="summary-details flex-column center">
        <p>
          {lang("date")}: {date.toLocaleDateString("fi-FI")}
        </p>
        <p>
          {lang("arrival_time")}: {arrival}
        </p>
        <p>
          {lang("length_of_stay")}: {length} h
        </p>
        <p>
          {lang("tables")}: {tables.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ReservationSummary;
