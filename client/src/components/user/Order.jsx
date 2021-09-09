import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

const Order = () => {
  const {
    orderState: { orderLoading, order },
    getOrder,
  } = React.useContext(UserContext);
  const {
    authState: { isAuthenticated, user },
  } = React.useContext(AuthContext);
  React.useEffect(() => (isAuthenticated ? getOrder(user._id) : null), []);
  console.log(order);
  return (
    <div className="animate__animated animate__fadeIn">
      <h1>My Order</h1>
      {orderLoading ? <div className="user-order"></div> : null}
    </div>
  );
};

export default Order;
