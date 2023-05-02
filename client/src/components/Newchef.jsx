import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chef from './Chef';
import backgroundImage from '../img/login.jpg'

const Newchef = (props) => {
  const { cookstyle } = props;

  const [orders, setOrders] = useState([]);
  const [speechCount, setSpeechCount] = useState(0);
  const [displayChef, setDisplayChef] = useState(false); // add new state variable

  const searchMenuItemByName = async (nameArray) => {
    try {
      const promises = nameArray.map(async (name) => {
        const response = await fetch(`http://localhost:8080/api/menuitems?name=${name}`);
        const menuItem = await response.json();
        return JSON.stringify(menuItem);
      });
      const results = await Promise.all(promises);
      return results;
      
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const socket = io("http://localhost:8080");
  
    const handleOrderBroadcast = async (order) => {
      const data = order.items.map(item => item.item);
      const stringArray = data.join(",").split(",");
      console.log(stringArray);
  
      const menuItems = await searchMenuItemByName(stringArray);
  
      order.items.forEach((item, index) => {
        item.item = menuItems[index];
      });
  
      console.log(order.items);
  
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
    };
  
    socket.on('orderBroadcast', handleOrderBroadcast);
  
    return () => {
      socket.off("orderBroadcast", handleOrderBroadcast);
    };
  }, []);
  

  const handleDeleteOrder = (orderToDelete) => {
    setOrders(prevOrders => prevOrders.filter(order => order !== orderToDelete));
    setSpeechCount(0);
  };

  return (
    
      <div   className='bg-inheirt  bg-slate-500'>
    
      <div className='p-1 bg-inherit'>
      <button
  className="p-2 font-sm bg-inherit rounded  text-white  focus:outline-none "
  onClick={() => setDisplayChef(!displayChef)}
>
  {displayChef ? "Hide Chef" : "Show Chef"}
</button>

      {/* Render Chef component if displayChef is true */}
      {displayChef && <Chef />}
      </div>
      <div 
className="relative  bg-cover bg-no-repeat mx-auto bg-slate-500 bg-opacity-50"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          >
        {/* <h2 className="text-2xl p-5 font-semibold  text-slate-300  bg-slate-500 bg-opacity-50 "></h2> */}
        
        <div className="grid grid-cols-3 gap-4 bg-inherit ">
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
            <div key={index} className=" bg-slate-900 bg-opacity-80 border border-black rounded-lg shadow-2xl p-4 relative z-10">
              <h3 className="text-lg text-white  font-bold  mb-2">{order.name}</h3>
              <p className="text-white text-sm mb-1">
                Phone Number: {order.phoneNumber}
              </p>
              <p className="text-white  text-sm mb-1">
                Table No: {order.tableNo}
              </p>
              <p className="text-white  text-sm mb-1">
                Token No: {order.tokenNo}
              </p>
             
              <ul className="list-disc ml-4">
              <table className="w-full text-sm mt-4">
              <div className="text-2xl bg-inherit p-4 rounded-lg my-4">
  <table>
    <thead>
      <tr>
        <th className="text-white">Items</th>
        <th className="text-white">Tips</th>
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
                  <li key={index} className="text-lg relative z-10 text-white">
                    {itemName} <span>-</span>{itemType}<span>-Quantity-</span>({itemQuantity})<span>Kg</span>
                  </li>
                );
              })}
          </ul>
        </td>
        <td className="p-4">
          <div className="bg-slate-300 realative z-10  rounded-lg p-4 text-grey">
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
            
              <button onClick={() => handleDeleteOrder(order)} className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded mt-2">
                Delete Order
              </button>
              <span className='px-20'></span>
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
}} className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded mt-2">
  Repeat Speech
</button>
            </div>
          ))}
        </div>
        <div className=' bg-inherit h-96  bg-slate-900 bg-opacity-50' > </div>
        <div className=' bg-inherit h-96  bg-slate-900 bg-opacity-50' > </div>
        
      </div>
      </div>
    );
  };
  
  export default Newchef;
  