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

 
  // const handleOrderSubmit = (order) => {
  //   setOrderData(order);
  // };
  const [orderData, setOrderData] = useState(null);

  return (
    <div
      // className="min-h-screen flex flex-col items-center justify-center"
      // style={{
      //   background: `url(${restaurantTableImage}) center/cover`, // Set the background image
      // }}
    >
      {/* Position Html5QrcodePlugin to left corner */}
      {/* <div className="absolute top-20 left-20 mt-8 ml-8 z-10">
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={(decodedText, decodedResult) =>
            onNewScanResult(decodedText, decodedResult, handleNewPreferenceData)
          }
          className="w-80"
        />
      </div> */}

      {/* Position ParentComponent to right corner */}
      {/* <div className="absolute top-0 right-20 mt-8 mr-8 z-10">
        <ParentComponent preferenceData={preferenceData} />
      </div> */}

<div><FeedbackForm/></div>

<div class="flex flex-wrap justify-center">
  <div class="w-full md:w-1/2 lg:w-1/3 p-2 z-10 ">
    <Menu />
  </div>
  <div class="w-full md:w-1/2 lg:w-2/3 p-2 z-10">
    <OrderComponent setOrderData={setOrderData} class="h-64 w-64" />
  </div>
</div>
      <div>
               {orderData && <Billing orderData={orderData}/>}
</div>
    </div>
  );
};
export default Cashier;


// I've used Tailwind CSS classes to style the Cashier component.
//  I've applied a background color of bg-gray-100 to the parent div
//   for a light gray background. I've used flexbox classes flex justify-center 
//   items-center to center the Html5QrcodePlugin component vertically and horizontally
//    within the parent div. I've also added margin top of mt-8 to center the ParentComponent
//     component below the Html5QrcodePlugin component. Additionally, I've added w-80 class to
//      the Html5QrcodePlugin component to set its width to 80% of its parent's width. 
// You can adjust the classes according to your design requirements.
