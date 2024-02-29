// import { useState } from "react";
// import Flights from "@/components/CalculationComponents/Flights";
// import Electricity from "@/components/CalculationComponents/Electricity";
// import Vehicles from "@/components/CalculationComponents/Vehicles";
// import Shipping from "@/components/CalculationComponents/Shipping";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Link } from "react-router-dom";

// const CalculationPage = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [responseList, setResponseList] = useState([]);

//   const handleFlightData = (flightData, type) => {
//     console.log(type);
//     setResponseList([...responseList, { data: flightData, carbonType: type }]);
//   };

//   const handleVehicleData = (vehicleData, type) => {
//     console.log(type);
//     setResponseList([...responseList, { data: vehicleData, carbonType: type }]);
//   };

//   const handleShippingData = (result, type) => {
//     console.log(type);
//     setResponseList([...responseList, { data: result, carbonType: type }]);
//   };

//   const handleElectricityData = (result, type) => {
//     console.log(type);
//     setResponseList([...responseList, { data: result, carbonType: type }]);
//   };

//   const calculateElecSum = (type, unit) => {
//     return responseList.reduce((total, response) => {
//       console.log(response.carbonType);
//       if (response.carbonType === "Electricity") {
//         switch (unit) {
//           case "g":
//             return total + response.data.data.attributes.carbon_g;
//           case "lb":
//             return total + response.data.data.attributes.carbon_lb;
//           case "kg":
//             return total + response.data.data.attributes.carbon_kg;
//           case "mt":
//             return total + response.data.data.attributes.carbon_mt;
//           default:
//             return total;
//         }
//       }
//       return total;
//     }, 0);
//   };
//   const calculateFlightSum = (type, unit) => {
//     return responseList.reduce((total, response) => {
//       console.log(response.carbonType);
//       if (response.carbonType === "Flight") {
//         switch (unit) {
//           case "g":
//             return total + response.data.data.attributes.carbon_g;
//           case "lb":
//             return total + response.data.data.attributes.carbon_lb;
//           case "kg":
//             return total + response.data.data.attributes.carbon_kg;
//           case "mt":
//             return total + response.data.data.attributes.carbon_mt;
//           default:
//             return total;
//         }
//       }
//       return total;
//     }, 0);
//   };
//   const calculateShippingSum = (type, unit) => {
//     return responseList.reduce((total, response) => {
//       console.log(response.carbonType);
//       if (response.carbonType === "Shipping") {
//         switch (unit) {
//           case "g":
//             return total + response.data.data.attributes.carbon_g;
//           case "lb":
//             return total + response.data.data.attributes.carbon_lb;
//           case "kg":
//             return total + response.data.data.attributes.carbon_kg;
//           case "mt":
//             return total + response.data.data.attributes.carbon_mt;
//           default:
//             return total;
//         }
//       }
//       return total;
//     }, 0);
//   };
//   const calculateVehicleSum = (type, unit) => {
//     return responseList.reduce((total, response) => {
//       console.log(response.carbonType);
//       if (response.carbonType === "Vehicle") {
//         switch (unit) {
//           case "g":
//             return total + response.data.data.attributes.carbon_g;
//           case "lb":
//             return total + response.data.data.attributes.carbon_lb;
//           case "kg":
//             return total + response.data.data.attributes.carbon_kg;
//           case "mt":
//             return total + response.data.data.attributes.carbon_mt;
//           default:
//             return total;
//         }
//       }
//       return total;
//     }, 0);
//   };

//   const calculateTotalEmissions = () => {
//     const emissions = {
//       flight: calculateFlightSum("Flight", "kg"),
//       vehicle: calculateVehicleSum("Vehicle", "kg"),
//       shipping: calculateShippingSum("Shipping", "kg"),
//       electricity: calculateElecSum("Electricity", "kg"),
//     };

//     return Object.values(emissions).reduce(
//       (total, emission) => total + emission,
//       0
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   console.log(responseList);

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="tab">
//             <h1>Flights</h1>
//             <Flights handleFlightData={handleFlightData} />
//           </div>
//         );
//       case 1:
//         return (
//           <div className="tab">
//             <h1>Electricity</h1>
//             <Electricity handleElectricityData={handleElectricityData} />
//           </div>
//         );
//       case 2:
//         return (
//           <div className="tab">
//             <h1>Shipping</h1>
//             <Shipping handleShippingData={handleShippingData} />
//           </div>
//         );
//       case 3:
//         return (
//           <div className="tab">
//             <h1>Vehicle</h1>
//             <Vehicles handleVehicleData={handleVehicleData} />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//   return (
//     <>
//       <div className="min-h-screen flex">
//         <div className="relative flex-1 px-">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage:
//                 'url("https://images.unsplash.com/photo-1697597699447-804b85782fec?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
//               filter: "brightness(0.6)",
//             }}
//           ></div>
//           <div className="text-white flex justify-center items-center  h-full relative">
//             <div className="flex flex-col justify-center items-center ">
//               <h2 className="text-3xl font-bold mb-4">GreenTrackr </h2>
//               <div id="regForm" onSubmit={handleSubmit}>
//                 {renderStep()}
//                 <div style={{ overflow: "auto" }}>
//                   <div style={{ float: "right" }}>
//                     {currentStep !== 0 && (
//                       <button type="button" onClick={prevStep}>
//                         Previous
//                       </button>
//                     )}
//                     {currentStep !== 3 && (
//                       <button
//                         className="my-7 px-7"
//                         type="button"
//                         onClick={nextStep}
//                       >
//                         Next
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 p-2 flex  justify-center">
//           <div className=" p-4 ">
//             <h2>Your calculated carbon footprint</h2>
//             <p>
//               Total Emmissions from flights {calculateFlightSum("flight", "kg")}{" "}
//               kg
//             </p>
//             <p>
//               Total Emmissions from Energy use{" "}
//               {calculateElecSum("electricity", "kg")} kg
//             </p>
//             <p>
//               Total Emmissions from Shipping items
//               {calculateShippingSum("shipping", "kg")} kg
//             </p>
//             <p>
//               Total Emmissions from Vehiclerides
//               {calculateVehicleSum("vehicle", "kg")} kg
//             </p>

//             {responseList.map((response) => (
//               <Card
//                 key={response.data.data.id}
//                 className="border w-400 h-40 border-gray-200 rounded-md flex flex-col mb-2"
//               >
//                 <CardHeader className="mb-1">
//                   <CardTitle>{response.carbonType}</CardTitle>

//                   <p>
//                     <span className="font-semibold">Distance</span>{" "}
//                     {response.data.data.attributes.distance_value} kms
//                   </p>
//                 </CardHeader>
//                 <CardContent className="flex-1 overflow-y-auto scrollbar-hidden">
//                   <p className="font-semibold">Carbon Emissions:</p>
//                   <ul>
//                     <li>Grams: {response.data.data.attributes.carbon_g} g</li>
//                     <li>
//                       Kilograms: {response.data.data.attributes.carbon_kg} kg
//                     </li>
//                     {/* <li>Pounds: {response.data.attributes.carbon_lb} lb</li>
//                     <li>Metric Tons: {response.data.data.attributes.carbon_mt} mt</li> */}
//                   </ul>
//                 </CardContent>
//                 <CardFooter className="mt-1">
//                   <p>
//                     <span className="font-semibold">Estimated At:</span>{" "}
//                     {response.data.data.attributes.estimated_at}
//                   </p>
//                 </CardFooter>
//               </Card>
//             ))}
//             <div></div>
//             <p>{calculateTotalEmissions()} kg</p>

//             <Link to="/carbon-calculation/track-goals">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
//                 type="button"
//               >
//                 Keep track of my carbon footprint
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CalculationPage;

import { useState } from "react";
import Flights from "@/components/CalculationComponents/Flights";
import Electricity from "@/components/CalculationComponents/Electricity";
import Vehicles from "@/components/CalculationComponents/Vehicles";
import Shipping from "@/components/CalculationComponents/Shipping";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import { Link } from "react-router-dom";
import TrackGoals from "./TrackGoals";

const CalculationPage = () => {
  const [currentStep, setCurrentStep] = useState("flights");
  const [responseList, setResponseList] = useState([]);

  const handleFlightData = (flightData, type) => {
    console.log(type);
    setResponseList([...responseList, { data: flightData, carbonType: type }]);
  };

  const handleVehicleData = (vehicleData, type) => {
    console.log(type);
    setResponseList([...responseList, { data: vehicleData, carbonType: type }]);
  };

  const handleShippingData = (result, type) => {
    console.log(type);
    setResponseList([...responseList, { data: result, carbonType: type }]);
  };

  const handleElectricityData = (result, type) => {
    console.log(type);
    setResponseList([...responseList, { data: result, carbonType: type }]);
  };

  const calculateElecSum = (unit) => {
    return responseList.reduce((total, response) => {
      console.log(response.carbonType);
      if (response.carbonType === "Electricity") {
        switch (unit) {
          case "g":
            return total + response.data.data.attributes.carbon_g;
          case "lb":
            return total + response.data.data.attributes.carbon_lb;
          case "kg":
            return total + response.data.data.attributes.carbon_kg;
          case "mt":
            return total + response.data.data.attributes.carbon_mt;
          default:
            return total;
        }
      }
      return total;
    }, 0);
  };
  const calculateFlightSum = (unit) => {
    return responseList.reduce((total, response) => {
      console.log(response.carbonType);
      if (response.carbonType === "Flight") {
        switch (unit) {
          case "g":
            return total + response.data.data.attributes.carbon_g;
          case "lb":
            return total + response.data.data.attributes.carbon_lb;
          case "kg":
            return total + response.data.data.attributes.carbon_kg;
          case "mt":

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
  const calculateShippingSum = (unit) => {
    return responseList.reduce((total, response) => {
      console.log(response.carbonType);
      if (response.carbonType === "Shipping") {
        switch (unit) {
          case "g":
            return total + response.data.data.attributes.carbon_g;
          case "lb":
            return total + response.data.data.attributes.carbon_lb;
          case "kg":
            return total + response.data.data.attributes.carbon_kg;
          case "mt":
            return total + response.data.data.attributes.carbon_mt;
          default:
            return total;
        }
      }
      return total;
    }, 0);
  };
  const calculateVehicleSum = (unit) => {
    return responseList.reduce((total, response) => {
      console.log(response.carbonType);
      if (response.carbonType === "Vehicle") {
        switch (unit) {
          case "g":
            return total + response.data.data.attributes.carbon_g;
          case "lb":
            return total + response.data.data.attributes.carbon_lb;
          case "kg":
            return total + response.data.data.attributes.carbon_kg;
          case "mt":
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
      flight: calculateFlightSum("kg"),
      vehicle: calculateVehicleSum("kg"),
      shipping: calculateShippingSum("kg"),
      electricity: calculateElecSum("kg"),
    };

    return Object.values(emissions).reduce(
      (total, emission) => total + emission,
      0
    );
  };


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


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(responseList);

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

          ></div>
          <div className="text-white flex justify-center items-center  h-full relative">
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-3xl font-bold mb-4">GreenTrackr</h2>
              <Tabs defaultValue="flights" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="flights">Flights</TabsTrigger>
                  <TabsTrigger value="electricity">Electricity</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                  {/* <TabsTrigger value="track-goals">Track My Goals</TabsTrigger> */}
                </TabsList>
                <TabsContent
                  value="flights"
                  style={{ disply: "flex", alignItems: "center" }}
                >
                  <div
                    className="tab"
                    style={{ disply: "flex", alignItems: "center" }}
                  >
                    <h1>Flights</h1>
                    <Flights handleFlightData={handleFlightData} />
                  </div>
                </TabsContent>
                <TabsContent value="electricity">
                  <div className="tab">
                    <h1>Electricity</h1>
                    <Electricity
                      handleElectricityData={handleElectricityData}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="shipping">
                  <div className="tab">
                    <h1>Shipping</h1>
                    <Shipping handleShippingData={handleShippingData} />
                  </div>
                </TabsContent>
                <TabsContent value="vehicle">
                  <div className="tab">
                    <h1>Vehicle</h1>
                    <Vehicles handleVehicleData={handleVehicleData} />
                  </div>
                </TabsContent>
                {/* <TabsContent value="vehicle">
                  <div className="tab">
                    <h1>Track My Goals</h1>
                    <TrackGoals />
                  </div>
                </TabsContent> */}
              </Tabs>

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

        <div className="flex-1 p-2 flex  justify-center">
          <div className=" p-4 ">
            <h2>Your calculated carbon footprint</h2>
            <p>
              Total Emmissions from flights {calculateFlightSum("flight", "kg")}{" "}
              kg
            </p>
            <p>
              Total Emmissions from Energy use{" "}
              {calculateElecSum("electricity", "kg")} kg
            </p>
            <p>
              Total Emmissions from Shipping items{" "}
              {calculateShippingSum("shipping", "kg")} kg
            </p>
            <p>
              Total Emmissions from Vehicle rides{" "}
              {calculateVehicleSum("vehicle", "kg")} kg
            </p>
            {responseList.map((response) => (
              <Card
                key={response.data.data.id}
                className="border w-400 h-40 border-gray-200 rounded-md flex flex-col mb-2"
              >
                <CardHeader className="mb-1">
                  <CardTitle>{response.carbonType}</CardTitle>
                  <p>
                    <span className="font-semibold">Distance</span>{" "}
                    {response.data.data.attributes.distance_value} kms
                  </p>






        <div className="flex-1 p-2 flex  justify-center">
          <div className=" p-4 ">
            <h2>Your calculated  carbon footprint</h2>
            <p>Total Emmissions from flights {calculateSum('Flight', 'kg')} kg</p>
            <p>Total Emmissions from Energy use {calculateSum('Electricity', 'kg')} kg</p>
            <p>Total Emmissions from Shipping items{calculateSum('Shipping', 'kg')} kg</p>
            <p>Total Emmissions from Vehicle rides{calculateSum('Vehicle', 'kg')} kg</p>


            {responseList.map((response) => (
              <Card key={response.data.data.id} className="border w-400 h-40 border-gray-200 rounded-md flex flex-col mb-2">
                <CardHeader className="mb-1">
                  <CardTitle>{response.carbonType}</CardTitle>

                  <p><span className="font-semibold">Distance</span> {response.data.data.attributes.distance_value} kms</p>

                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto scrollbar-hidden">
                  <p className="font-semibold">Carbon Emissions:</p>
                  <ul>
                    <li>Grams: {response.data.data.attributes.carbon_g} g</li>

                    <li>
                      Kilograms: {response.data.data.attributes.carbon_kg} kg
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-1">
                  <p>
                    <span className="font-semibold">Estimated At:</span>{" "}
                    {response.data.data.attributes.estimated_at}
                  </p>
                </CardFooter>
              </Card>
            ))}
            <p>Total Emissions: {calculateTotalEmissions()} kg</p>
          </div>
        </div>
      </div>

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
            <div>
            </div>
            <p>{calculateTotalEmissions()} kg</p>
          </div>
        </div>
      </div >

    </>
  );
};

export default CalculationPage;
