import {useLanguage} from "../../context/LanguageContext";

const OrderTable = ({userDetails, orderDetails}) => {
  const {lang} = useLanguage();

  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {userDetails.orders.length > 0 ? (
          userDetails.orders.map((order, index) => (
            <tr key={index}>
              <td>{order}</td>
              <td>{new Date(orderDetails[index].time).toLocaleString()}</td>
              <td>
                {lang(
                  `admin_orders_page.status_${orderDetails[index].order[0].status}`
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No orders available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
