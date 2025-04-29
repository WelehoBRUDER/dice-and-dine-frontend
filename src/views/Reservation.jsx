import {useLanguage} from "../context/LanguageContext";
import {useEffect, useState} from "react";
import LoadingWheel from "../components/LoadingWheel";

const Reservation = () => {
  const {lang, setCurrentPage} = useLanguage();
  const [tables, setTables] = useState([]);

  const [step, setStep] = useState(0);
  const [reservationLength, setReservationLength] = useState();
  const [reservationDate, setReservationDate] = useState();
  const [reservationTables, setReservationTables] = useState([]);

  // Move this somewhere else in the future
  // Time is measured in hours
  const _reservationLengths = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setCurrentPage("reservation_page");
  }, []);
  return (
    <div>
      <h1>{lang("make_reservation")}</h1>
      <LoadingWheel loadingText="loading_reservation" />
    </div>
  );
};

export default Reservation;
