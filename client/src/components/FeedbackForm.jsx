import React, { useState } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [response, setResponse] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/menuItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      const data = await res.json();
      console.log(data);
      const items = data.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        category: item.category,
        type: item.type,
      }));
      setResponse(items);
      setMenuItems(items);
    } catch (err) {
      console.error(err);
      setResponse("Server error");
    }
  };
  
  const handleDragStart = (event, menuItem) => {
    event.dataTransfer.setData('text/plain', menuItem.name);
  }

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div className="min-h-screen flex-col  items-center text-white ">
      <form
        className="max-w-md rounded-lg my-10 overflow-hidden shadow-lg p-8 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="feedback"
          >
            Preferences
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {response && (
        <div className="max-w-md  bg-white  rounded-lg overflow-hidden shadow-lg p-8 mt-4 ">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((menuItem) => (
                <tr
                  key={menuItem._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, menuItem)}
                >
                  <td>{menuItem.name}</td>
                  <td>{menuItem.price}</td>
                  <td>{menuItem.category}</td>
                  <td>{menuItem.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
