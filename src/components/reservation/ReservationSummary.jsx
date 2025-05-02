import LoadingWheel from "../LoadingWheel";
import ResultWindow from "../ResultWindow";
import TextArea from "../TextArea";
import Button from "../Button.jsx";
import {useLanguage} from "../../context/LanguageContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {icons} from "../../variables/icons";
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
const ReservationSummary = ({
  date,
  arrival,
  length,
  tables,
  title,
  setSuccess,
}) => {
  const {lang} = useLanguage();
  const {makeReservation, loading, reservationSuccess, reservationId} =
    useReservation();
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      setSuccess(true);
      setResult({
        success: true,
        title: "reservation_success",
        desc: "reservation_success_desc",
        continueCallback: () => {
          navigate("/");
        },
      });
    } else if (reservationId) {
      setResult({
        success: false,
        title: "reservation_failed",
        desc: "reservation_failed_desc",
        tryAgainCallback: () => {
          setResult(null);
        },
      });
    }
  }, [reservationSuccess, reservationId]);
  return (
    <div className="summary">
      <h2>{title}</h2>
      {loading && <LoadingWheel loadingText="making_reservation" />}
      {!loading && !result && (
        <div className="summary-details flex-column">
          <div className="prev-details flex-column">
            <div className="flex-row between">
              <div className="flex-row center">
                <img src={icons.calendar}></img>
                <p>{lang("date")}</p>{" "}
              </div>
              <span>{date.toLocaleDateString("fi-FI")}</span>
            </div>
            <div className="flex-row between">
              <div className="flex-row center">
                <img src={icons.calendar_clock}></img>
                <p>{lang("arrival_time")}</p>
              </div>
              <span> {arrival}</span>
            </div>
            <div className="flex-row between">
              <div className="flex-row center">
                <img src={icons.clock}></img>
                <p>{lang("length_of_stay")}</p>
              </div>
              <span>{length} h</span>
            </div>
            <div className="flex-row between">
              <div className="flex-row center">
                <img src={icons.map}></img>
                <p>{lang("tables")}</p>
              </div>
              <span>{tables.join(", ")}</span>
            </div>
          </div>
          <TextArea
            name="info"
            text={lang("additional_info")}
            onChange={(e) => setMessage(e.target.value)}
          ></TextArea>
          <Button
            onClick={handleSubmit}
            disabled={!canMakeReservation()}
            type="submit"
          >
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
