import LoadingWheel from "../LoadingWheel";
import ResultWindow from "../ResultWindow";
import TextArea from "../TextArea";
import Button from "../Button.jsx";
import {useLanguage} from "../../context/LanguageContext";
import {useEffect, useState} from "react";
import useReservation from "../../hooks/useReservation";

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
  const {makeReservation, loading, reservationSuccess, reservationId} =
    useReservation();
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const canMakeReservation = () => {
    return date && arrival && length && tables.length > 0;
  };

  const handleSubmit = () => {
    const arrivalDate = new Date(date);
    const [hours, minutes] = arrival.split(":").map(Number);
    const arrivalHours = hours + minutes / 60;
    arrivalDate.setHours(arrivalHours);
    const departureDate = new Date(date);
    departureDate.setHours(arrivalHours + length);

    const toMySQLDateTime = (date) => {
      const pad = (n) => n.toString().padStart(2, "0");

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // Months are zero-indexed
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // These values will be sent to the backend
    const values = {
      arrival_time: toMySQLDateTime(arrivalDate),
      departure_time: toMySQLDateTime(departureDate),
      tables: tables,
      additional_information: message,
      reservation_size: 1,
    };
    const token = localStorage.getItem("token");

    makeReservation(values, token);
  };

  useEffect(() => {
    if (reservationSuccess) {
      setResult({
        success: true,
        title: "reservation_success",
        desc: "reservation_success_desc",
        continueCallback: () => {
          window.location.href = "/reservations";
        },
      });
    } else if (reservationId) {
      setResult({
        success: false,
        title: "reservation_failed",
        desc: "reservation_failed_desc",
        tryAgainCallback: () => {
          window.location.reload();
        },
      });
    }
  }, [reservationSuccess, reservationId]);
  return (
    <div className="summary scrollable">
      <h2>{title}</h2>
      {loading && <LoadingWheel loadingText="making_reservation" />}
      {!loading && !result && (
        <div className="summary-details flex-column">
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
          <TextArea
            name="info"
            text={lang("additional_info")}
            onChange={(e) => setMessage(e.target.value)}
          ></TextArea>
          <Button onClick={handleSubmit} disabled={!canMakeReservation()}>
            {lang("make_reservation")}
          </Button>
        </div>
      )}
      {!loading && result && (
        <ResultWindow
          success={result.success}
          title={lang(result.title)}
          desc={lang(result.desc)}
          continueCallback={result.continueCallback}
          tryAgainCallback={result.tryAgainCallback}
        />
      )}
    </div>
  );
};

export default ReservationSummary;
