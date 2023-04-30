import React, { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { onNewScanResult } from "./ScanResultHandler.js";
import ParentComponent from "./ParentComponent";
import Menu from "./Menu";
import OrderComponent from "./OrderComponent";
import Billing from "./Billing";
import FeedbackForm from "./FeedbackForm";

const restaurantTableImage = "https://img.freepik.com/premium-photo/restaurant-blur-background-design-resource_236836-16729.jpg"

const Cashier = () => {

  const handleNewPreferenceData = (data) => {
    console.log("Preference Data:", data);
    setPreferenceData(data);
  };

  const [preferenceData, setPreferenceData] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const slideDownStyles = {
    marginTop: "500px", // Replace this with the height of your feedback and order components
  };

  return (
    <div>
     <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" onClick={toggleScanner}>
  fetch
</button>

      {showScanner && (
        <div className="absolute top-20 left-20 mt-8 ml-8 z-10">
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={(decodedText, decodedResult) =>
              onNewScanResult(decodedText, decodedResult, handleNewPreferenceData)
            }
            className="w-80"
          />
        </div>
      )}
      {showScanner && (
        <div className="absolute top-0 right-20 mt-8 mr-8 z-10">
          <ParentComponent preferenceData={preferenceData} />
        </div>
      )}
<div style={showScanner ? slideDownStyles : null}>
  <div class="flex flex-wrap justify-between bg-blue-100 px-10">
    <div class="w-1/3  bg-green-100 p-4">
      <FeedbackForm />
    </div>
    <div class="w-1/3 bg-pink-100 p-4">
      <Menu />
    </div>
    <div class="w-1/3 bg-yellow-100 p-4">
      <OrderComponent setOrderData={setOrderData} />
    </div>
  </div>

  <div>
    {orderData && <Billing orderData={orderData}/>}
  </div>
</div>

    </div>
  );
};
export default Cashier;
