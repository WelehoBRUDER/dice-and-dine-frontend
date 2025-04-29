import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useTables() {
  const [tables, setTables] = useState([]);
  const [tableOrders, setTableOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTables() {
      try {
        const data = await fetchData(`${API_URL}/tables/tables`);
        console.log("Table data: ", data);
        setTables(data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    }
    async function loadTableOrders() {
      try {
        const data = await fetchData(`${API_URL}/tables`);
        console.log("Table order data: ", data);
        setTableOrders(data);
      } catch (error) {
        console.error("Error fetching table orders:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTables();
    loadTableOrders();
  }, []);

  return {tables, tableOrders, loading};
}

export default useTables;
