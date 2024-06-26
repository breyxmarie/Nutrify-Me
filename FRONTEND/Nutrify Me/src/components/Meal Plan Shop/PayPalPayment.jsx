import React from "react";
import ReactDOM from "react-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {
  const serverUrl = "http://localhost:8888";
  const createOrder = (data) => {
    // Order is created on the server and the order id is returned
    return fetch(`${serverUrl}/my-server/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        product: {
          description: "Wood Candy Sofa",
          cost: "399.0",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };
  return (
    <PayPalButtons
      //   createOrder={(data) => createOrder(data, actions)}
      //   onApprove={(data) => onApprove(data, actions)}
      createOrder={(data) => createOrder(data)}
      onApprove={(data) => onApprove(data)}
    />
  );
};

export default PayPalPayment;
