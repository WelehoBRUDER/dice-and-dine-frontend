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
  return (
    <div className="summary">
      <h2>{title}</h2>
      <div className="summary-details">
        <p>Date: {date.toLocaleDateString("fi-FI")}</p>
        <p>Arrival Time: {arrival}</p>
        <p>Length: {length} hours</p>
        <p>Tables: {tables.join(", ")}</p>
      </div>
    </div>
  );
};

export default ReservationSummary;
