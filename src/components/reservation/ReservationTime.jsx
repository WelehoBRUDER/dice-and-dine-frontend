import Input from "../Input";

const ReservationTime = ({arrival, departure}) => {
  return (
    <div className="reservation-time">
      <h2>Reservation Time</h2>
      <Input name="arrival" text="Arrival time" type="time" value={arrival} />
      <Input
        name="departure"
        text="Departure time"
        type="time"
        value={departure}
      />
    </div>
  );
};

export default ReservationTime;
