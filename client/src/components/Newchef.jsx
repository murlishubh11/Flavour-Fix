import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chef from './Chef';
import backgroundImage from '../img/chef.jpg'

const Newchef = (props) => {
  const { cookstyle } = props;

  const [orders, setOrders] = useState([]);
  const [speechCount, setSpeechCount] = useState(0);
  const [displayChef, setDisplayChef] = useState(false); // add new state variable

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
    
      <div 
className="relative  bg-cover bg-no-repeat  mx-auto "
          style={{ backgroundImage: `url(${backgroundImage})` }}
          >
      {/* Add the button to toggle Chef component */}
      
      <button
  className="px-4 py-4 font-medium text-slate-500 bg-slate-900 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  onClick={() => setDisplayChef(!displayChef)}
>
  {displayChef ? "Hide Chef" : "Show Chef"}
</button>

      {/* Render Chef component if displayChef is true */}
      {displayChef && <Chef />}
        <h2 className="text-2xl font-semibold mb-4">New Orders</h2>
        <div className="grid grid-cols-3 gap-4">
  {orders.filter((order) => {
    return order.items.some((item) => {
      if (item && item.item) {
        const parsedItem = JSON.parse(item.item);
        return parsedItem.type === cookstyle;
      } else {
        console.error('item is not defined or does not have item property');
        return false;
      }
    });
          }).map((order, index) => (
            <div key={index} className="bg-red-100 rounded-lg shadow-2xl p-4">
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
             
              <ul className="list-disc ml-4">
              <table className="w-full text-sm mt-4">
              <div className="text-2xl bg-red-200 p-4 rounded-lg my-4">
  <table>
    <thead>
      <tr>
        <th className="text-gray-700">Items</th>
        <th className="text-gray-700">Tips</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="p-4">
          <ul>
            {order.items.filter((item) => JSON.parse(item.item).type === cookstyle)
              .map((item, index) => {
                const itemName = JSON.parse(item.item).name;
                const itemType = JSON.parse(item.item).type;
                const itemQuantity = item.quantity;
                return (
                  <li key={index} className="text-lg text-gray-700">
                    {itemName} <span>-</span>{itemType}<span>-Quantity-</span>({itemQuantity})<span>Kg</span>
                  </li>
                );
              })}
          </ul>
        </td>
        <td className="p-4">
          <div className="bg-red-300 rounded-lg p-4 text-grey">
            {order.tips.map((tip, index) => (
              <div key={index} className="mb-2">
                {tip}
              </div>
            ))}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

</table>


              </ul>
            
              <button onClick={() => handleDeleteOrder(order)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                Delete Order
              </button>
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
}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
  Repeat Speech
</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Newchef;
  