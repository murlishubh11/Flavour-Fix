import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chef = () => {
  const [preferenceData, setPreferenceData] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("preferenceUpdated", (updatedPreference) => {
      setPreferenceData(prevData => [...prevData, updatedPreference]);

      // Read items and tips out loud
      const itemsText = updatedPreference.items.join(", ");
      const tipsText = updatedPreference.tips.join(", ");
      const speech = new SpeechSynthesisUtterance(`New order! Items: ${itemsText}. Tips: ${tipsText}.`);
      speech.lang = "en-US";
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    });

    return () => {
      socket.off("preferenceUpdated");
    };
  }, []);
  
  
  const handleDelete = (index) => {
    // Create a copy of preferenceData state
    const updatedData = [...preferenceData];
    // Remove the data at the given index
    updatedData.splice(index, 1);
    // Update the preferenceData state with the updatedData
    setPreferenceData(updatedData);
  };
  return (
    <div
      className="bg-gradient-to-r bg-inherit min-h-screen bg-fixed bg-center bg-cover"
  
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Orders</h1>
    {preferenceData.length > 0 ? (
      preferenceData.map((data, index) => (
        // Check if all fields are not null before rendering the data
        data.items && data.tips && data.tableNo && data.tokenNo && data.name && data.phone ? (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 mb-4"
          >

            <table className="table-fixed w-full">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="w-20 px-4 py-2">Items</th>
                      <th className="w-20 px-4 py-2">Tips</th>
                      <th className="w-10 px-4 py-2">Table No</th>
                      <th className="w-10 px-4 py-2">Token No</th>
                      <th className="w-10 px-4 py-2">Name</th>
                      <th className="w-10 px-4 py-2">Phone</th>
                      <th className="w-10 px-4 py-2">options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-200">
                      <td className="w-20 px-4 py-2">
                        {data.items.map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}
                      </td>
                      <td className="w-20 px-4 py-2">
                        {data.tips.map((tip, index) => (
                          <div key={index}>{tip}</div>
                        ))}
                      </td>
                      <td className="w-10 px-4 py-2">{data.tableNo}</td>
                      <td className="w-10 px-4 py-2">{data.tokenNo}</td>
                      <td className="w-10 px-4 py-2">{data.name}</td>
                      <td className="w-10 px-4 py-2">{data.phone}</td>
                      <td className="w-10 px-4 py-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>

            </td>
                    </tr>
                  </tbody>
                </table>
          </div>
        ) : null
      ))
    ) : (
      <p className="text-lg text-white">No Orders left !! stay tuned </p>
      )}
    </div>
  </div>
);
};


export default Chef;

