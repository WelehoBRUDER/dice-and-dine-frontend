import {useEffect, useMemo, useState} from "react";
import useOrder from "../../hooks/useOrder";
import LoadingWheel from "../../components/LoadingWheel";
import useMenu from "../../hooks/useMenu";

const Orders = () => {
  const {getAllOrders, loading, postOrderStatus} = useOrder();
  const [orders, setOrders] = useState([]);
  const {menu, loading: menuLoading} = useMenu();
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const menuMap = useMemo(() => {
    const map = {};
    menu.forEach((item) => {
      map[item.id] = item.name;
    });
    return map;
  }, [menu]);

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

  if (loading || menuLoading) {
    return <LoadingWheel />;
  }

  return (
    <div>
      <h1>Manage Orders</h1>
      <div className="flex-row">
        <label htmlFor="status-filter-label" className="status-filter-label">
          Filter by Status:
        </label>
        <select
          className="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)} // Update filter status on change
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label htmlFor="date-filter-label" className="status-filter-label">
          Filter by Date:
        </label>
        <input
          type="date"
          className="status-filter"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
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
              <td>{group.order[0].status}</td>
              <td>{new Date(group.time).toLocaleString()}</td>
              <td>
                <select
                  value={group.order[0].status}
                  onChange={(e) =>
                    handleStatusChange(group.order[0].order_id, e.target.value)
                  }
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
