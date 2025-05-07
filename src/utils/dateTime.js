const parseDateToTimeStamp = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1; // Months are zero-based
  const year = d.getFullYear();

  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} @ ${hours}:${minutes}`;
};

export default parseDateToTimeStamp;
