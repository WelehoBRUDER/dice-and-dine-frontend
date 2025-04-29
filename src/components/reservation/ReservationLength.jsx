const ReservationLength = ({}) => {
  return (
    <>
      <label htmlFor="reservation-length">Reservation Length:</label>
      <select
        id="reservation-length"
        value={length}
        style={{backgroundColor: "black"}}
        onChange={(e) => setLength(e.target.value)}
      >
        {lengths?.map((length, index) => (
          <option key={index} value={length}>
            {length} hours
          </option>
        ))}
      </select>
    </>
  );
};
