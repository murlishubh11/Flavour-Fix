import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chef from './Chef';


const Newchef = (props) => {
    const { cookstyle } = props;
  
    const [orders, setOrders] = useState([]);
    const [speechCount, setSpeechCount] = useState(0);
  
    useEffect(() => {
      const socket = io("http://localhost:8080");
  
      socket.on('orderBroadcast', (order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
        
        const filteredItems = order.items.filter((item) => JSON.parse(item.item).type === cookstyle);
        const items = filteredItems.map((item) => JSON.parse(item.item).name).join(', ');
        const tips = order.tips.join(', ');
      
        // Generate speech synthesis
        const speech = new SpeechSynthesisUtterance(`New order! Items: ${items}. Tips: ${tips}.`);
        speech.lang = "en-US";
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
        
      });
  
      return () => {
        socket.off("orderBroadcast");
      };
    }, []);
  
    const handleDeleteOrder = (orderToDelete) => {
      setOrders(prevOrders => prevOrders.filter(order => order !== orderToDelete));
       setSpeechCount(0);
    };
  
    return (

      
      <div className="container mx-auto my-8">
        <div><Chef/></div>
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
  .map((item, index) => {
    const itemName = JSON.parse(item.item).name;
    const itemType = JSON.parse(item.item).type;
    const itemQuantity = item.quantity;
    return (
      <li key={index} className="text-sm text-gray-700">
        {itemName} <span>-</span>{itemType}<span>-Quantity-</span>({itemQuantity})<span>Kg</span>
      </li>
    );
  })}
<button onClick={() => {
  const filteredItems = order.items.filter((item) => JSON.parse(item.item).type === cookstyle);
  const items = filteredItems.map((item) => JSON.parse(item.item).name).join(', ');
  const tips = order.tips.join(', ');

  const speech = new SpeechSynthesisUtterance(`New order! Items: ${items}. Tips: ${tips}.`);
  speech.lang = "en-US";
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  setSpeechCount(count => count + 1);
}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
  Repeat Speech ({speechCount})
</button>

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
  