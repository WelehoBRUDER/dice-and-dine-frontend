import {useLanguage} from "../context/LanguageContext";
import {useEffect, useState} from "react";
import LoadingWheel from "../components/LoadingWheel";
import useTables from "../hooks/useTables";
import ReservationDate from "../components/reservation/ReservationDate";
import ReservationTime from "../components/reservation/ReservationTime";

const Reservation = () => {
  const {lang, setCurrentPage} = useLanguage();

  const [step, setStep] = useState(0);
  const [reservationLength, setReservationLength] = useState();
  const [reservationDate, setReservationDate] = useState(new Date());
  const [reservationArrival, setReservationArrival] = useState();
  const [reservationTables, setReservationTables] = useState([]);
  const {loading, tables, tableOrders} = useTables();

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
    <div>
      <h1>{lang("make_reservation")}</h1>
      {loading && <LoadingWheel loadingText="loading_reservation" />}
      <ReservationDate date={reservationDate} setDate={setReservationDate} />
      <ReservationTime
        arrival={reservationArrival}
        length={reservationLength}
        setArrival={setReservationArrival}
        setLength={setReservationLength}
        date={reservationDate}
        info={{reservationLengths, restaurantOpen}}
      />
    </div>
  );
};

export default Reservation;
