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

// const accountSid = 'YOUR_ACCOUNT_SID';
// const authToken = 'YOUR_AUTH_TOKEN';
// const client = require('twilio')(accountSid, authToken);

// const phoneNumber = '9347532701';
// const message = `Click here to leave a review: http://localhost:3000/#`;

// client.messages
//   .create({
//     body: message,
//     from: 'tno', 
//     to: phoneNumber
//   })
//   .then(message => console.log(`Message sent to ${message.to}`));

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
    className="max-w-sm mx-auto mt-10 p-4 bg-inherit border border-white rounded-lg shadow-md"
  >
    <h2 className="text-2xl font-bold mb-4">Update Preferences</h2>
    <div className="flex flex-wrap -mx-2 mb-4">
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="name" className="block text-white mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-inherit focus:ring-blue-400"
        />
      </div>
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="phone" className="block text-white mb-2">
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none bg-inherit focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  
    <div className="flex flex-wrap -mx-2 mb-4">
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="tips" className="block  text-white mb-2">
          Tips:
        </label>
        <input
          type="text"
          id="tips"
          name="tips"
          value={tips}
          onChange={handleTipsChange}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none  bg-inherit focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="items" className="block text-white mb-2">
          Items:
        </label>
        <input
          type="text"
          id="items"
          name="items"
          value={items.join(", ")}
          onChange={handleItemsChange}
          className="w-full px-4 py-2 rounded-lg border  bg-inherit focus:outline-none
          focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  
    <div className="flex flex-wrap -mx-2 mb-4">
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="tokenNo" className="block text-white mb-2">
          Token No:
        </label>
        <input
          type="text"
          id="tokenNo"
          name="tokenNo"
          value={tokenNo}
          onChange={(e) => setTokenNo(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border bg-inherit focus:outline-none
          focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label htmlFor="tableNo" className="block text-white mb-2">
          Table No:
        </label>
        <input
          type="text"
          id="tableNo"
          name="tableNo"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border  bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  
    <div className="flex justify-between mt-6">
    <button
      type="submit"
      className="w-full   text-white py-2 px-4 border border-white rounded-md bg-inherit hover:bg-blue-600 transition duration-300"
    >
     Update
    </button>
    <button
      type="button"
      onClick={handleClearFormFields}
      className=" text-white-700 px-4 py-2  bg-inherit rounded-md hover:bg-gray-300 transition-colors duration-300"
    >
      Clear
    </button>
   
  </div>
</form>



  );
};


export default MyForm;


// add this implementation
//  when form submitted i want it to send a sms link to phone number which is available with
//  as phone in form and the link should render a new tab in their phone which is review 
//  form in my website when user submtting the review in text he can also add photo of him 
//   and it should get stored in db

