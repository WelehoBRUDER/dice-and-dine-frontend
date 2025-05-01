import {useLanguage} from "../../context/LanguageContext";
import Button from "../Button";

const ReservationTables = ({tables, tablesAvailable, setTables}) => {
  const {lang} = useLanguage();

  const handleTableChange = (id) => {
    if (!tables.includes(id)) {
      tables.push(id);
    } else {
      tables.splice(tables.indexOf(id), 1);
    }
    setTables([...tables]);
  };

  return (
    <div className="reservation-tables">
      <h2>{lang("reservation_tables")}</h2>
      <div className="tables flex-row center wrap scrollable">
        {tablesAvailable.map((table, index) => (
          <Button
            key={index}
            className={`btn-old ${tables.includes(table.id) ? "selected" : ""}`}
            onClick={() => handleTableChange(table.id)}
          >
            {lang("table")} {table.id} | {table.seats} {lang("seats")}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ReservationTables;
