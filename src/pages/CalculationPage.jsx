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
  const [responseList, setResponseList] = useState([]);


  const handleFlightData = (flightData) => {   
    setResponseList([...responseList, flightData])
  };

  const handleVehicleData = (vehicleData) => { 
    setResponseList([...responseList, vehicleData])
  };

  const handleShippingData = (result) => {
    setResponseList([...responseList, result])
  };

  const handleElectricityData = (result) => {
    setResponseList([...responseList, result])
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
            <Flights handleFlightData={handleFlightData} />
          </div>

        );
      case 1:
        return (
          <div className="tab">
            <h1>Electricity</h1>
            <Electricity handleElectricityData={handleElectricityData} />
          </div>
        );
      case 2:
        return (
          <div className="tab">
            <h1>Shipping</h1>
            <Shipping handleShippingData={handleShippingData} />

          </div>
        );
      case 3:
        return (
          <div className="tab">
            <h1>Vehicle</h1>
            <Vehicles handleVehicleData={handleVehicleData} />

          </div>
        );
      default:
        return null;
    }
  };
  return (



    <>
      <div className="min-h-screen flex">
        <div className="relative flex-1 px-">
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
                    {currentStep !== 3 && <button className='my-7 px-7' type="button" onClick={nextStep}>Next</button>}
                  </div>
                </div>

              </div>


            </div>
          </div>


        </div>





        <div className="flex-1 p-12 flex  justify-center">
          <div className="max-w-md">
            {responseList.map((response) => (
              <Card key={response.data.id}>
                <CardHeader>
                  <CardTitle> carbon</CardTitle>

                  <p><span className="font-semibold">Distance</span> {response.data.attributes.distance_value} kms</p>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Carbon Emissions:</p>
                  <ul>
                    <li>Grams: {response.data.attributes.carbon_g} g</li>
                    <li>Kilograms: {response.data.attributes.carbon_kg} kg</li>
                    <li>Pounds: {response.data.attributes.carbon_lb} lb</li>
                    <li>Metric Tons: {response.data.attributes.carbon_mt} mt</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p><span className="font-semibold">Estimated At:</span> {response.data.attributes.estimated_at}</p>

                </CardFooter>
              </Card>
            ))}



            <div>
          


            </div>

          </div>


        </div>




      </div >


    </>

  );

}

export default CalculationPage


