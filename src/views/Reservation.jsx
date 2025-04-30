import {useLanguage} from "../context/LanguageContext";
import {useEffect, useState} from "react";
import {icons} from "../variables/icons";
import LoadingWheel from "../components/LoadingWheel";
import useTables from "../hooks/useTables";
import ReservationSteps from "../components/reservation/ReservationSteps";
import ReservationDate from "../components/reservation/ReservationDate";
import ReservationArrival from "../components/reservation/ReservationArrival";
import ReservationLength from "../components/reservation/ReservationLength";
import ReservationTables from "../components/reservation/ReservationTables";
import ReservationSummary from "../components/reservation/ReservationSummary";
import Button from "../components/Button";
import "../style/reservation.css";

const Reservation = () => {
  const {lang, setCurrentPage} = useLanguage();

  const values = {
    date: new Date(),
    arrival: null,
    departure: null,
    tables: [],
  };

  const [step, setStep] = useState(0);
  const [reservationLength, setReservationLength] = useState(values.departure);
  const [reservationDate, setReservationDate] = useState(values.date);
  const [reservationArrival, setReservationArrival] = useState(values.arrival);
  const [reservationTables, setReservationTables] = useState(values.tables);
  const {loading, tables, tableOrders} = useTables();
  const steps = [
    {step: 0, name: "reservation_date", icon: icons.calendar},
    {step: 1, name: "reservation_arrival", icon: icons.calendar_clock},
    {step: 2, name: "reservation_length", icon: icons.clock},
    {step: 3, name: "reservation_tables", icon: icons.map},
    {step: 4, name: "reservation_summary", icon: icons.overview},
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

  useEffect(() => {
    if (step < 0) {
      setStep(0);
    }
    if (step > steps.length - 1) {
      setStep(steps.length - 1);
    }
  }, [step]);

  const reflectUserChoice = (name) => {
    switch (name) {
      case "reservation_date":
        return reservationDate.toLocaleDateString("fi-FI");

      case "reservation_arrival":
        return reservationArrival || lang("not_set_arrival");

      case "reservation_length":
        return reservationLength
          ? `${reservationLength} h`
          : lang("not_set_length");

      case "reservation_tables":
        return reservationTables.length > 0
          ? reservationTables.join(", ")
          : lang("not_set_tables");

      case "reservation_summary":
        return lang("reservation_summary_text");

      default:
        return name;
    }
  };
  const changeStep = (newStep) => {
    if (newStep < step) {
      const rollbackActions = [
        () => setReservationArrival(values.arrival),
        () => setReservationLength(values.departure),
        () => setReservationTables(values.tables),
      ];

      rollbackActions.slice(newStep).forEach((action) => action());
    }

    setStep(newStep);
  };

  return (
    <div className="reservation flex-column">
      <div className="reservation-header flex-row center">
        <h1>{lang("reservation")}</h1>
      </div>
      <div className="reservation-content flex-column">
        <ReservationSteps
          steps={steps}
          step={step}
          changeStep={changeStep}
          reflectUserChoice={reflectUserChoice}
        />
        {loading && <LoadingWheel loadingText="loading_reservation" />}
        {!loading && step === 0 && (
          <ReservationDate
            date={reservationDate}
            setDate={setReservationDate}
            title={lang(steps[step].name)}
            locale={lang("id")}
          />
        )}
        {!loading && step === 1 && (
          <ReservationArrival
            arrival={reservationArrival}
            length={reservationLength}
            setArrival={setReservationArrival}
            setLength={setReservationLength}
            date={reservationDate}
            info={{reservationLengths, restaurantOpen}}
            title={lang(steps[step].name)}
          />
        )}
        {!loading && step === 2 && (
          <ReservationLength
            length={reservationLength}
            setLength={setReservationLength}
            arrival={reservationArrival}
            info={{reservationLengths, restaurantOpen}}
            title={lang(steps[step].name)}
          />
        )}
        {!loading && step === 3 && (
          <ReservationTables
            tables={reservationTables}
            tablesAvailable={tables}
            setTables={setReservationTables}
            title={lang(steps[step].name)}
          />
        )}
        {!loading && step === 4 && (
          <ReservationSummary
            date={reservationDate}
            arrival={reservationArrival}
            length={reservationLength}
            tables={reservationTables}
            title={lang(steps[step].name)}
          />
        )}
      </div>
      <div className="navigation flex-row center">
        <Button
          className="btn"
          disabled={step === 0}
          onClick={() => changeStep(step - 1)}
        >
          {"<"}
        </Button>
        <Button
          className="btn"
          disabled={step === steps.length - 1}
          onClick={() => changeStep(step + 1)}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
