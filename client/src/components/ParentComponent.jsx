import React from "react";
import MyForm from "./MyForm";

const ParentComponent = ({preferenceData}) => {
  return (
    <div className="flex justify-center mt-8">
      {console.log("triggered parentcomponent successfully")}
      {/* Render MyForm and pass preferenceData as prop */}
      {preferenceData && <MyForm preferenceData={preferenceData}  />}

    </div>
  );
};

export default ParentComponent;
 


