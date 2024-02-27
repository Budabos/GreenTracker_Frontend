import { useState } from 'react';
import Flights from '@/components/CalculationComponents/Flights';
import Electricity from '@/components/CalculationComponents/Electricity';
import Vehicles from '@/components/CalculationComponents/Vehicles';
import Shipping from '@/components/CalculationComponents/Shipping';



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const CalculationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responseFlightData, setResponseFlightData] = useState([]);


  const handleFlightData = (Data) => {
    setResponseFlightData(Data)
  };
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (

          <div className="tab">
            <h1>Flights</h1>
            <Flights flightData={handleFlightData} />
          </div>

        );
      case 1:
        return (
          <div className="tab">
            <h1>Electricity</h1>
            <Electricity />
            {/* <p><input placeholder="E-mail..." onChange={handleChange} name="email" value={formData.email} /></p>
            <p><input placeholder="Phone..." onChange={handleChange} name="phone" value={formData.phone} /></p> */}
          </div>
        );
      case 2:
        return (
          <div className="tab">
            <h1>Shipping</h1>
            <Shipping />
            {/* <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div> */}
          </div>
        );
      case 3:
        return (
          <div className="tab">
            <h1>Vehicle</h1>
            <Vehicles />
            {/* <p><input placeholder="Username..." onChange={handleChange} name="uname" value={formData.uname} /></p>
            <p><input placeholder="Password..." onChange={handleChange} name="pword" type="password" value={formData.pword} /></p> */}
          </div>
        );
      default:
        return null;
    }
  };
  return (



    <>
      <div className="min-h-screen flex">
        <div className="relative flex-1 px-2">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1697597699447-804b85782fec?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              filter: "brightness(0.6)",
            }}
          >
          </div>
          <div className="text-white flex justify-center items-center  h-full relative">
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-3xl font-bold mb-4">GreenTrackr </h2>
              <div id="regForm" onSubmit={handleSubmit}>

                {renderStep()}
                <div style={{ overflow: 'auto' }}>
                  <div style={{ float: 'right' }}>
                    {currentStep !== 0 && <button type="button" onClick={prevStep}>Previous</button>}
                    {currentStep !== 3 && <button type="button" onClick={nextStep}>Next</button>}
                    {currentStep === 3 && <button type="submit">Submit</button>}
                  </div>
                </div>
                {/* <div style={{ textAlign: 'center' }}>
                  {[0, 1, 2, 3].map((step, index) => (
                    <span key={index} className={index === currentStep ? 'step active' : 'step'}></span>
                  ))}
                </div> */}
              </div>


            </div>
          </div>


        </div>





        <div className="flex-1 p-12 flex  justify-center">
          <div className="max-w-md">

            <Card>
              <CardHeader>
                <CardTitle>Flight Footprint</CardTitle>
                <CardDescription>Estimated at :{responseFlightData.data.attributes.estimated_at}</CardDescription>
                <CardDescription>Carbon :{responseFlightData.data.attributes.carbon_g} g</CardDescription>
              </CardHeader>
              <CardContent>

                <p>Distance value : {responseFlightData.data.attributes.distance_value} kms</p>
                <p>Distance value : {responseFlightData.distance_value} kms</p>

              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>
          </div>

        </div>




      </div >


    </>

  );

}

export default CalculationPage



// const id = data.data.id;
// const type = data.data.type;
// const passengers = data.data.attributes.passengers;
// const legs = data.data.attributes.legs;
// const estimatedAt = data.data.attributes.estimated_at;
// const carbonGrams = data.data.attributes.carbon_g;
// const carbonPounds = data.data.attributes.carbon_lb;
// const carbonKilograms = data.data.attributes.carbon_kg;
// const carbonMetricTons = data.data.attributes.carbon_mt;
// const distanceUnit = data.data.attributes.distance_unit;
// const distanceValue = data.data.attributes.distance_value;