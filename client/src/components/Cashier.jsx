import React, { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { onNewScanResult } from "./ScanResultHandler.js";
import ParentComponent from "./ParentComponent";
import Menu from "./Menu";
import OrderComponent from "./OrderComponent";
import Billing from "./Billing";
import FeedbackForm from "./FeedbackForm";
import backgroundImage from "../img/login.jpg"

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
    <div className="bg-slate-700">
     <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" onClick={toggleScanner}>
  fetch
</button>

      {showScanner && (
        <div className="absolute top-20 left-20 mt-8 ml-8  z-10">
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









<div style={showScanner ? slideDownStyles : null} >

  <div 
className="relative overflow-hidde bg-cover bg-no-repeat flex flex-wrap justify-between  px-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          >
 <div class="absolute inset-0 bg-slate-900 opacity-60 z-10 shadow-md"></div>
    <div class="w-1/3  relative z-10  p-4">
      <FeedbackForm />
    </div>
    <div class="w-1/3 relative z-10  py-10">
      <Menu />
    </div>
    <div class="w-1/3  relative  z-10  py-10  ">
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
