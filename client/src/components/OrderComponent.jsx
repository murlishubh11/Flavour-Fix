import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:8080");

const OrderComponent = (props) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tips, setTips] = useState([]);
  const [tableNo, setTableNo] = useState('');
  const [tokenNo, setTokenNo] = useState('');
  const [items, setItems] = useState([{ item: '', quantity: '' }]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleTipsChange = (e) => {
    setTips(e.target.value.split(',').map((tip) => tip.trim()));
  };

  const handleTableNoChange = (e) => {
    setTableNo(e.target.value);
  };

  const handleTokenNoChange = (e) => {
    setTokenNo(e.target.value);
  };





const handleItemChange = (index, field, value) => {
  

    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  
};


  const handleAddItem = () => {
    setItems([...items, { item: '', quantity: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const handleReset = () => {
    setName('');
    setPhoneNumber('');
    setTips([]);
    setTableNo('');
    setTokenNo('');
    setItems([{ item: '', quantity: '' }]);
  };
  

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(items);
    const order = {
      name,
      phoneNumber,
      tips,
      tableNo,
      tokenNo,
      items,
    };
  
    
    // Emit the order to all connected clients through a socket event
    socket.emit('newOrder', order);
    props.setOrderData(order); 
    // Reset the form
    // handleReset();
    // alert('Order submitted!');
  };

  return (
    <div class=' border border-gray-900 p-4 rounded-2xl ml-10 color="inherit'>
    <form onSubmit={handleSubmit} className=" mx-auto mt-8 resize-none hover:resize">
      <div className="mb-4">
        <label htmlFor="name" className="block text-white font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-inherit leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone-number" className="block text-white font-bold mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone-number"
          name="phone-number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-inherit leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white font-bold mb-2"></label>
        <table className="w-full border-hidden">
          <thead>
            <tr  className=" border-hidden" >
              <th className="text-left py-2 px-3 border-hidden text-white font-bold">Item</th>
              <th className="text-left py-2 px-3  border-hidden text-white font-bold">Quantity</th>
              <th className="py-2 px-3  border-hidden text-white font-bold"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-hidden py-2 px-3">
                  <input
                    type="text"
                    value={item.item}
                    onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-inherit text-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
                <td className="border  border-hidden py-2 px-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-inherit leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
                <td className="border  border-hidden py-2 px-3">
                  <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-600 text-2xl bg-inherit hover:text-red-800 font-bold">
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-0">
          <button type="button" onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-700 bg-inherit text-blue-400 text-2xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            +
          </button>
        </div>
      <div className="mb-4">
        <label htmlFor="tips" className="block text-white  font-bold mb-2">
          Tips (separate with comma)
        </label>
        <input
          type="text"
          id="tips"
          name="tips"
          value={tips.join(', ')}
          onChange={handleTipsChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-inherit text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="table-no" className="block text-white font-bold mb-2">
          Table No.
        </label>
        <input
          type="number"
          id="table-no"
          name="table-no"
          value={tableNo}
          onChange={handleTableNoChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-inherit text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="token-no" className="block text-white font-bold mb-2">
          Token No.
        </label>
        <input
          type="number"
          id="token-no"
          name="token-no"
          value={tokenNo}
          onChange={handleTokenNoChange}
          className="shadow appearance-none border rounded w-full py-2 bg-inherit px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      </div>

      <button type="button" onClick={handleReset} className="bg-red-500 bg-inherit text-2xl text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      ↻
     </button>
      <span className="mt-2 ml-20">
        <button type="submit" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </span>
    </form>
    </div>
  );
};

export default OrderComponent;

