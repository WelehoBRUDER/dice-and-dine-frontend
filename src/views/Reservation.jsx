import {useLanguage} from "../context/LanguageContext";
import {useEffect, useState} from "react";
import LoadingWheel from "../components/LoadingWheel";
import useTables from "../hooks/useTables";
import ReservationDate from "../components/reservation/ReservationDate";
import ReservationTime from "../components/reservation/ReservationTime";
import Button from "../components/Button";
import "../style/reservation.css";

const Reservation = () => {
  const {lang, setCurrentPage} = useLanguage();

  const [step, setStep] = useState(0);
  const [reservationLength, setReservationLength] = useState();
  const [reservationDate, setReservationDate] = useState(new Date());
  const [reservationArrival, setReservationArrival] = useState();
  const [reservationTables, setReservationTables] = useState([]);
  const {loading, tables, tableOrders} = useTables();
  const steps = [
    {step: 0, name: "reservation_date"},
    {step: 1, name: "reservation_arrival"},
    {step: 2, name: "reservation_length"},
    {step: 3, name: "reservation_tables"},
    {step: 4, name: "reservation_summary"},
  ];

  // Move this somewhere else in the future
  // Time is measured in hours
  const reservationLengths = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8];

  // Hardcoded because the format in the database is hard to parse
  const restaurantOpen = {
    open: 9,
    close: 21,
  };

  useEffect(() => {
    setCurrentPage("reservation_page");
  }, []);

  return (
    <div className="reservation flex-column">
      <div className="reservation-header flex-row center">
        <h1>{lang("reservation")}</h1>
        <div className="reservation-steps flex-row">
          {steps.map((stepObj) => (
            <Button
              key={stepObj.step}
              className={`reservation-step flex-row center ${
                step === stepObj.step ? "active" : ""
              }`}
              onClick={() => {
                if (stepObj.step !== step) {
                  setStep(stepObj.step);
                }
              }}
            >
              {stepObj.step + 1}
            </Button>
          ))}
        </div>
      </div>
      {loading && <LoadingWheel loadingText="loading_reservation" />}
      {!loading && step === 0 && (
        <ReservationDate
          date={reservationDate}
          setDate={setReservationDate}
          title={lang(steps[step].name)}
        />
      )}
      {!loading && step === 1 && (
        <ReservationTime
          arrival={reservationArrival}
          length={reservationLength}
          setArrival={setReservationArrival}
          setLength={setReservationLength}
          date={reservationDate}
          info={{reservationLengths, restaurantOpen}}
        />
      )}
    </div>
  );
};

export default Reservation;
