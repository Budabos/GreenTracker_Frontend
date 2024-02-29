import { useState } from 'react';
import Flights from '@/components/CalculationComponents/Flights';
import Electricity from '@/components/CalculationComponents/Electricity';
import Vehicles from '@/components/CalculationComponents/Vehicles';
import Shipping from '@/components/CalculationComponents/Shipping';




import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const CalculationPage = () => {
  // const [currentStep, setCurrentStep] = useState(0);
  const [responseList, setResponseList] = useState([]);


  const handleFlightData = (flightData, type) => {

    console.log(type)
    setResponseList([...responseList, { data: flightData, carbonType: type }]);
  };

  const handleVehicleData = (vehicleData, type) => {
    console.log(type)
    setResponseList([...responseList, { data: vehicleData, carbonType: type }]);
  };

  const handleShippingData = (result, type) => {
    console.log(type)
    setResponseList([...responseList, { data: result, carbonType: type }]);
  };

  const handleElectricityData = (result, type) => {
    console.log(type)
    setResponseList([...responseList, { data: result, carbonType: type }]);
  };



  const calculateSum = (type, unit) => {
    return responseList.reduce((total, response) => {
      console.log(response.carbonType)
      if (response.carbonType === type) {

        switch (unit) {
          case 'g':
            return total + response.data.data.attributes.carbon_g;
          case 'lb':
            return total + response.data.data.attributes.carbon_lb;
          case 'kg':
            return total + response.data.data.attributes.carbon_kg;
          case 'mt':
            return total + response.data.data.attributes.carbon_mt;
          default:
            return total;
        }
      }
      return total;

    }, 0);
  };


  const calculateTotalEmissions = () => {
    const emissions = {
      flight: calculateSum('Flight', 'kg'),
      vehicle: calculateSum('Vehicle', 'kg'),
      shipping: calculateSum('Shipping', 'kg'),
      electricity: calculateSum('Electricity', 'kg'),
    };

    return Object.values(emissions).reduce((total, emission) => total + emission, 0);
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
          <div className=" text-white flex justify-center items-center  h-full relative">
            <div className="  flex flex-col justify-center items-center ">
              <h2 className="text-3xl font-bold mb-4">GreenTrackr </h2>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className=" grid w-full grid-cols-4">
                  <TabsTrigger value="flight">Flights</TabsTrigger>
                  <TabsTrigger value="electricity">Electricity</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                </TabsList>
                <TabsContent value="flight">
                  <Flights handleFlightData={handleFlightData} />
                </TabsContent>
                <TabsContent value="electricity">
                  <Electricity handleElectricityData={handleElectricityData} />
                </TabsContent>
                <TabsContent value="shipping">
                  <Shipping handleShippingData={handleShippingData} />
                </TabsContent>
                <TabsContent value="vehicle">
                  <Vehicles handleVehicleData={handleVehicleData} />
                </TabsContent>
              </Tabs>



            </div>
          </div>


        </div>





        <div className="flex flex-1  justify-center">
          <div className=" p-4 ">
            <div className="w-400 mb-3 text-center bg-white border border-green-200 rounded-lg shadow sm:p-8">
              <h2 className="mb-2 text-3xl  text-gray-900 dark:text-white">Your calculated  carbon footprint</h2>

              <div className='items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse  '>
                <a href="#" className="w-full sm:w-auto bg-green-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className=" rtl:text-right">
                    <div className="mb-1 text-xs">Total flights Emissions </div>
                    <div className="-mt-1 font-sans text-sm font-semibold">{calculateSum('Flight', 'kg')} kg</div>
                  </div>
                </a>
                <a href="#" className="w-full sm:w-auto bg-green-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className="text-left rtl:text-right">
                    <div className="mb-1 text-xs">Total Emissions from Energy use</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">{calculateSum('Flight', 'kg')} kg</div>
                  </div>
                </a>
                <a href="#" className="w-full sm:w-auto bg-green-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className="text-left rtl:text-right">
                    <div className="mb-1 text-xs">Total Emissions from Shipping items</div>
                    <div className="-mt-1 font-sans text-sm font-semibold"> {calculateSum('Electricity', 'kg')}kg</div>
                  </div>
                </a>
                <a href="#" className="w-full sm:w-auto bg-green-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className="text-left rtl:text-right">
                    <div className="mb-1 text-xs">Total Emissions from Vehicle rides</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">{calculateSum('Vehicle', 'kg')} kg</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="" >

              {responseList.map((response) => (
                <Card key={response.data.data.id} className="flex flex-col   rounded-md w-300 h-40 border-green-200  mb-3 shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <CardHeader className="flex flex-col justify-between p-3 leading-normal">
                    <CardTitle>{response.carbonType}</CardTitle>

                    <p><span className="font-semibold">Distance</span> {response.data.data.attributes.distance_value} kms</p>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto scrollbar-hidden flex flex-col justify-between  leading-normal">
                    <p className=" text-1xl  tracking-tight dark:text-white"><span className="font-semibold  ">Carbon Emissions:</span><span> {response.data.data.attributes.carbon_g} g</span></p>
                    <ul>
                      <li>Grams: {response.data.data.attributes.carbon_g} g</li>
                      <li>Kilograms: {response.data.data.attributes.carbon_kg} kg</li>
                      <li>Pounds: {response.data.data.attributes.carbon_lb} lb</li>
                      <li>Metric Tons: {response.data.data.attributes.carbon_mt} mt</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-1">
                    <p><span className="font-semibold">Estimated At:</span> {response.data.data.attributes.estimated_at}</p>

                  </CardFooter>
                </Card>
              ))}
            </div>
            <div>
            </div>
            <p className='text-3xl  text-gray-900'>{calculateTotalEmissions()} kg</p>
          </div>
        </div>
      </div >
    </>

  );

}

export default CalculationPage