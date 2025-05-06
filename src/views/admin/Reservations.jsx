/**
 * Reservations.jsx
 * @description This file contains the Reservations component, which displays a list of reservations made by customers.
 * It allows the admin to filter reservations by date and provides options to edit or delete reservations.
 * It uses the useReservation hook to fetch reservation data and the useLanguage context for localization.
 * The component also includes a loading state while fetching data.
 * @returns {JSX.Element} The Reservations component.
 */
import {useEffect, useState} from "react";
import {useLanguage} from "../../context/LanguageContext";
import useReservation from "../../hooks/useReservation";
import Button from "../../components/Button";
import LoadingWheel from "../../components/LoadingWheel";

const Reservations = () => {
  const {loading, getAllReservations} = useReservation();
  const [reservations, setReservations] = useState([]);
  const {lang, setCurrentPage} = useLanguage();
  const [filterDate, setFilterDate] = useState("");
  const formatDateToInput = (iso) => {
    return new Date(iso).toISOString().split("T")[0];
  };

  const fetchReservations = async () => {
    try {
      const reservations = await getAllReservations();
      if (!reservations) {
        console.error("No reservations found");
        return;
      }
      setReservations(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDelete = async (reservationId) => {
    console.log(
      "So you want to delete reservation with ID:" +
        reservationId +
        "? Not happening."
    );
  };

  const handleEdit = async (reservationId) => {
    console.log(
      "So you want to edit reservation with ID:" +
        reservationId +
        "? Not happening."
    );
  };
  useEffect(() => {
    fetchReservations();
    setCurrentPage("reservations_page");
  }, []);
  if (loading) {
    return <LoadingWheel />;
  }

  return (
    <>
      <article>
        <title>{lang("reservations_page.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="flex-column">
        <h1>{lang("reservations_page.title")}</h1>
        <div className="admin-center">
          <p>
            <strong>
              🚧 Project deadline hit before this feature did. Coming soon ---
              or not!
            </strong>
          </p>
          <p>{lang("reservations_page.description")}</p>
        </div>

        <label>
          {lang("reservations_page.filter_by_date")}:
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="admin-filter"
          />
        </label>

        <table>
          <thead>
            <tr>
              <th>{lang("reservations_page.id")}</th>
              <th>{lang("reservations_page.reservedby")}</th>
              <th>{lang("reservations_page.arrival")}</th>
              <th>{lang("reservations_page.departure")}</th>
              <th>{lang("reservations_page.size")}</th>
              <th>{lang("reservations_page.tables")}</th>
              <th>{lang("reservations_page.additional")}</th>
              <th>{lang("reservations_page.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {reservations.filter((reservation) =>
              !filterDate
                ? true
                : formatDateToInput(reservation.arrival_time) === filterDate
            ).length === 0 ? (
              <tr>
                <td colSpan="8" style={{textAlign: "center", padding: "1rem"}}>
                  {filterDate
                    ? lang("reservations_page.no_for_selected")
                    : lang("reservations_page.no_reservations")}
                </td>
              </tr>
            ) : (
              reservations
                .filter((reservation) =>
                  !filterDate
                    ? true
                    : formatDateToInput(reservation.arrival_time) === filterDate
                )
                .map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.customer.name}</td>
                    <td>
                      {new Date(reservation.arrival_time).toLocaleString()}
                    </td>
                    <td>
                      {new Date(reservation.departure_time).toLocaleString()}
                    </td>
                    <td>{reservation.reservation_size}</td>
                    <td>{reservation.tables.join(", ")}</td>
                    <td>{reservation.additional_information}</td>
                    <td>
                      <Button
                        className="btn-smaller"
                        onClick={() => handleEdit(reservation.id)}
                        title="Edit"
                      >
                        ✏️
                      </Button>{" "}
                      <Button
                        className="btn-smaller"
                        onClick={() => handleDelete(reservation.id)}
                        title="Delete"
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;
