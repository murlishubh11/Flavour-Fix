import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client"; // Import the socket.io-client library

const socket = io("http://localhost:8080");

const MyForm = ({ preferenceData }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [tokenNo, setTokenNo] = useState("");
  const [tips, setTips] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (preferenceData) {
      // Set default values from preferenceData
      setName(preferenceData.name || "");
      setPhone(preferenceData.phone || "");
      setTips(preferenceData.tips|| ""); 
      if (preferenceData.items) {
        setItems(preferenceData.items);
      }
    }
  }, [preferenceData]);



  //--------------------------------------------------------------------------------
  // Handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  

  // Create a new object with the updated form data
  const updatedPreference = {
    name: name,
    phone: phone,
    tips: tips,
    tableNo: tableNo,
    tokenNo: tokenNo,
    items: items
  };
  socket.emit("updatePreference", updatedPreference);
  // Send a post request to the server to update the preference
  axios
    .post(`http://localhost:8080/preferences/${phone}`, updatedPreference)
    .then((response) => {
      // Handle successful response
      // You can perform any additional logic or UI updates here

      console.log("Preference updated successfully:", response.data);
      
// 
    })
    .catch((error) => {
      // Handle error
      // You can display an error message or perform any other error handling here
      console.error("Error updating preference:", error);
    });
};

  //--------------------------------------------------------------------------------
 
  const handleClearFormFields = () => {
    setName("");
    setPhone("");
    setTableNo("");
    setTokenNo("");
    setTips("");
    setItems([]);
  };
  

const handleTipsChange = (e) => {
  const value = e.target.value.split(",").map((tip) => tip.trim());
  setTips(value);
};
  // Handle change in items input
  const handleItemsChange = (e) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setItems(value);
  };

  return (
    
    <form
    onSubmit={handleSubmit}
    className="max-w-sm mx-auto mt-10 p-4 bg-white rounded-lg shadow-md"
  >
    <h2 className="text-2xl font-bold mb-4">Update Preferences</h2>
    <div className="flex flex-wrap -mx-2 mb-4">
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="phone" className="block mb-2">
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  
    <div className="flex flex-wrap -mx-2 mb-4">
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="tips" className="block mb-2">
          Tips:
        </label>
        <input
          type="text"
          id="tips"
          name="tips"
          value={tips}
          onChange={handleTipsChange}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="items" className="block mb-2">
          Items:
        </label>
        <input
          type="text"
          id="items"
          name="items"
          value={items.join(", ")}
          onChange={handleItemsChange}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none
          focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  
    <div className="flex flex-wrap -mx-2 mb-4">
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="tokenNo" className="block mb-2">
          Token No:
        </label>
        <input
          type="text"
          id="tokenNo"
          name="tokenNo"
          value={tokenNo}
          onChange={(e) => setTokenNo(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none
          focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="tableNo" className="block mb-2">
          Table No:
        </label>
        <input
          type="text"
          id="tableNo"
          name="tableNo"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  
    <div className="flex justify-between mt-6">
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
    >
     Update
    </button>
    <button
      type="button"
      onClick={handleClearFormFields}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
    >
      Clear
    </button>
  </div>
</form>
  );
};


export default MyForm;



// // In this example, I've used Tailwind CSS classes to style the form with a clean and modern look.
//  I've used rounded-lg for rounded corners, border for input fields, and focus:outline-none and 
//  focus:ring-2 classes to customize the focus state of the form inputs. I've also used hover:bg-* 
//  and transition-colors duration-* classes for smooth hover effects. 
//  The form has a max-width of 640px, centered using mx-auto class, and a margin-top of 10rem for 
//  vertical spacing. The buttons are styled with background color, text color, padding, and rounded-md
//   for a polished appearance.


