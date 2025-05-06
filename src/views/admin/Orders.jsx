/**
 * @file Orders.jsx
 * @description This file contains the Orders component, which is used to display and manage orders in the admin section of the application.
 * It uses the useOrder and useMenu hooks to fetch and update order data, and the useLanguage context to manage language settings.
 * The component allows the admin to filter orders by status and date, and update the status of each order.
 * It also includes a loading state while fetching data.
 * @returns {JSX.Element} The Orders component.
 *
 */
import {useEffect, useMemo, useState} from "react";
import useOrder from "../../hooks/useOrder";
import LoadingWheel from "../../components/LoadingWheel";
import useMenu from "../../hooks/useMenu";
import {useLanguage} from "../../context/LanguageContext";

const Orders = () => {
  const {getAllOrders, loading, postOrderStatus} = useOrder();
  const [orders, setOrders] = useState([]);
  const {menu: menuFi, loading: loadingFi} = useMenu("fi");
  const {menu: menuEn, loading: loadingEn} = useMenu("en");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const {lang, setCurrentPage} = useLanguage();
  const menuMap = useMemo(() => {
    const map = {};

    [...menuFi, ...menuEn].forEach((item) => {
      if (!map[item.id]) {
        map[item.id] = item.name;
      }
    });

    return map;
  }, [menuFi, menuEn]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      if (data) {
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (order, newStatus) => {
    try {
      const result = await postOrderStatus(order, newStatus);

      if (result && result === true) {
        const updatedOrders = await getAllOrders();
        setOrders(updatedOrders);
      } else {
        console.error("Failed to update order status", result);
      }
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const isStatusMatch =
      filterStatus === "all" || order.order[0].status === filterStatus;
    const isDateMatch =
      !filterDate ||
      new Date(order.time).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString();
    return isStatusMatch && isDateMatch;
  });

  useEffect(() => {
    setCurrentPage("admin_orders_page");
  }, []);

  if (loading || loadingFi || loadingEn) {
    return <LoadingWheel />;
  }

  return (
    <>
      <article>
        <title>{lang("admin_orders_page.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="flex-column">
        <h1>{lang("admin_orders_page.title")}</h1>
        <p>{lang("admin_orders_page.description")}</p>

        <div className="flex-row">
          <label htmlFor="status-filter-label" className="status-filter-label">
            {lang("admin_orders_page.filter_by_status")}:
          </label>
          <select
            className="admin-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)} // Update filter status on change
          >
            <option value="all">{lang("admin_orders_page.status_all")}</option>
            <option value="pending">
              {lang("admin_orders_page.status_pending")}
            </option>
            <option value="confirmed">
              {lang("admin_orders_page.status_confirmed")}
            </option>
            <option value="ready">
              {lang("admin_orders_page.status_ready")}
            </option>
            <option value="completed">
              {lang("admin_orders_page.status_completed")}
            </option>
            <option value="cancelled">
              {lang("admin_orders_page.status_cancelled")}
            </option>
          </select>

          <label htmlFor="date-filter-label" className="status-filter-label">
            {lang("admin_orders_page.filter_by_date")}:
          </label>
          <input
            type="date"
            className="admin-filter"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>{lang("admin_orders_page.th_order_id")}</th>
              <th>{lang("admin_orders_page.th_customer")}</th>
              <th>{lang("admin_orders_page.th_items")}</th>
              <th>{lang("admin_orders_page.th_status")}</th>
              <th>{lang("admin_orders_page.th_date")}</th>
              <th>{lang("admin_orders_page.th_actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((group, index) => (
              <tr key={index}>
                <td>{group.order[0].order_id}</td>
                <td>{group.customer.name}</td>
                <td>
                  <ul style={{margin: 0, paddingLeft: "1em"}}>
                    {group.order.map((item, i) => (
                      <li key={i}>
                        {menuMap[item.menu_item_id] ||
                          `Item #${item.menu_item_id}`}{" "}
                        (x{item.amount})
                      </li>
                    ))}
                  </ul>
                </td>

                <td>
                  {lang(`admin_orders_page.status_${group.order[0].status}`)}
                </td>
                <td>{new Date(group.time).toLocaleString()}</td>
                <td>
                  <select
                    value={group.order[0].status}
                    onChange={(e) =>
                      handleStatusChange(
                        group.order[0].order_id,
                        e.target.value
                      )
                    }
                    className="status-select"
                  >
                    <option value="pending">
                      {lang("admin_orders_page.status_pending")}
                    </option>
                    <option value="confirmed">
                      {lang("admin_orders_page.status_confirmed")}
                    </option>
                    <option value="ready">
                      {lang("admin_orders_page.status_ready")}
                    </option>
                    <option value="completed">
                      {lang("admin_orders_page.status_completed")}
                    </option>
                    <option value="cancelled">
                      {lang("admin_orders_page.status_cancelled")}
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
