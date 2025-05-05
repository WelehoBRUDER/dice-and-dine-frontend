import {useLanguage} from "../../context/LanguageContext";

const OrderTable = ({orderDetails}) => {
  const {lang} = useLanguage();
  if (!orderDetails || orderDetails.length === 0) {
    return <p>{lang("profile_page.no_orders")}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>{lang("profile_page.orderid")}</th>
          <th>{lang("profile_page.ordertime")}</th>
          <th>{lang("profile_page.orderstatus")}</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails.length > 0 ? (
          orderDetails.map((order, index) => (
            <tr key={order.id || index}>
              <td>{order.id}</td>
              <td>{new Date(order.time).toLocaleString()}</td>
              <td>
                {lang(`admin_orders_page.status_${order.order[0].status}`)}
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
