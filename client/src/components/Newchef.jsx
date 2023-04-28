import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Newchef = (props) => {
    const { cookstyle } = props;
  
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      const socket = io("http://localhost:8080");
  
      socket.on('orderBroadcast', (order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
      });
  
      return () => {
        socket.off("orderBroadcast");
      };
    }, []);
  
    const handleDeleteOrder = (orderToDelete) => {
      setOrders(prevOrders => prevOrders.filter(order => order !== orderToDelete));
    };
  
    return (
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4">New Orders</h2>
        <div className="grid grid-cols-3 gap-4">
          {orders.filter((order) => {
            return order.items.some((item) => {
              return JSON.parse(item.item).type === cookstyle;
            });
          }).map((order, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium mb-2">{order.name}</h3>
              <p className="text-gray-700 text-sm mb-1">
                Phone Number: {order.phoneNumber}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                Table No: {order.tableNo}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                Token No: {order.tokenNo}
              </p>
              <h4 className="text-base font-medium mt-4 mb-2">Items</h4>
              <ul className="list-disc ml-4">
              {order.items.filter((item) => JSON.parse(item.item).type === cookstyle)
            .map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {JSON.parse(item.item).name} <span>-</span>{JSON.parse(item.item).type}<span>-Quantity-</span>({item.quantity})<span>Kg</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 text-sm mb-1">
                Tips: {order.tips.join(', ')}
              </p>
              <button onClick={() => handleDeleteOrder(order)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                Delete Order
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Newchef;
  