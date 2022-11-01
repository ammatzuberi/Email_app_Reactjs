import React from 'react'
import "./Track.css";
import StepNavigation from "./stepNavigation";
import { useState } from 'react';

function Track() {
    const labelArray = ['Order Placed', 'Waiting For Aproval', 'Order is delivered', ]
    const [currentStep, updateCurrentStep] = useState(1);
  
    function updateStep(step) {
      updateCurrentStep(step);
    }
  
    return (


      <div className="App">
 
 

 
        <StepNavigation labelArray={labelArray} currentStep={currentStep} updateStep={updateStep}></StepNavigation>
       
        <button className="primaryButton" disabled={currentStep === 1} onClick={() => updateStep(currentStep - 1)}>Previous Step</button>
        <button className="primaryButton" disabled={currentStep === labelArray.length} onClick={() => updateStep(currentStep+1)}>Next Step</button>
      </div>
    );
  }

export default Track
