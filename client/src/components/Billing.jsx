import React from 'react';

const Billing = ({ orderData }) => {
  const { name, phoneNumber, tableNo, tokenNo, items } = orderData;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <p className="font-bold mb-2">Customer Name: {name}</p>
        <p className="font-bold mb-2">Phone Number: {phoneNumber}</p>
        <p className="font-bold mb-2">Table Number: {tableNo}</p>
        <p className="font-bold mb-2">Token Number: {tokenNo}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Items Ordered</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 bg-gray-100 text-gray-600 font-bold">Item</th>
              <th className="text-left py-2 px-3 bg-gray-100 text-gray-600 font-bold">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.item}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
