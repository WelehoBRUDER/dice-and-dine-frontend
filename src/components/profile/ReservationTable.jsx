import React from "react";
import {useLanguage} from "../../context/LanguageContext";

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate - startDate;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}min`;
};

const ReservationTable = ({reservationDetails}) => {
  const {lang} = useLanguage();
  if (!reservationDetails || reservationDetails.length === 0) {
    return <p>{lang("profile_page.no_reservations")}</p>;
  }

  return (
    <table className="reservation-table">
      <thead>
        <tr>
          <th>{lang("profile_page.reservationid")}</th>
          <th>{lang("profile_page.arrival")}</th>
          <th>{lang("profile_page.time_range")}</th>
          <th>{lang("profile_page.size")}</th>
          <th>{lang("profile_page.tables")}</th>
        </tr>
      </thead>
      <tbody>
        {reservationDetails.map((res) => (
          <tr key={res.id}>
            <td>{res.id}</td>
            <td>{formatDateTime(res.arrival_time)}</td>
            <td>{calculateDuration(res.arrival_time, res.departure_time)}</td>
            <td>{res.reservation_size || "-"}</td>
            <td>{res.tables?.join(", ") || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationTable;
