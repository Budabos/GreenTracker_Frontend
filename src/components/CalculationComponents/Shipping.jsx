// import React, { useState, useEffect } from "react";


// const Shipping = () => {
//   // State to store the carbon estimate data
//   const [carbonEstimate, setCarbonEstimate] = useState(null);
//   // State to store input values
//   const [inputValues, setInputValues] = useState({
//     weightValue: "",
//     weightUnit: "g",
//     distanceValue: "",
//     distanceUnit: "km",
//     transportMethod: "truck", // Default transport method
//   });

//   // Function to fetch carbon estimate data from the API
//   const fetchCarbonEstimate = async () => {
//     const url = "https://www.carboninterface.com/api/v1/estimates";


//     const apiKey = "tQwZxNs9meZ43GhGJvQ6UA";


//     // Data to be sent in the POST request, including input values from state
//     const data = {
//       type: "shipping",
//       weight_value: inputValues.weightValue,
//       weight_unit: inputValues.weightUnit,
//       distance_value: inputValues.distanceValue,
//       distance_unit: inputValues.distanceUnit,
//       transport_method: inputValues.transportMethod,
//     };

//     // Options for the POST request
//     const options = {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };

//     try {
//       // Fetch data from the API
//       const response = await fetch(url, options);
//       const result = await response.json();
//       setCarbonEstimate(result.data.attributes); // Update state with the fetched data
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle errors
//     }
//   };

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     fetchCarbonEstimate();
//   }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

//   // Function to handle changes in input values
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputValues({
//       ...inputValues,
//       [name]: value,
//     });
//     console.log(inputValues)
//   };

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     fetchCarbonEstimate(); // Fetch carbon estimate data
//   };
// console.log(first)
//   // import { zodResolver } from "@hookform/resolvers/zod";
//   // import { useForm } from "react-hook-form";
//   // import { z } from "zod";

//   // import { Button } from "@/components/ui/button";
//   // import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
//   // import { Input } from "@/components/ui/input";


//   // const FormSchema = z.object({
//   //   weight_value: z
//   //     .number({
//   //       required_error: "Please enter a valid weight value.",
//   //     }),
//   //   weight_unit: z
//   //     .string({
//   //       required_error: "Please select a weight unit.",
//   //     }),
//   //   distance_value: z
//   //     .number({
//   //       required_error: "Please enter a valid distance value.",
//   //     }),
//   //   distance_unit: z
//   //     .string({
//   //       required_error: "Please select a distance unit.",
//   //     }),
//   //   transport_method: z
//   //     .string({
//   //       required_error: "Please select a transport method.",
//   //     }),
//   // });

//   // const Shipping = ({ handleShippingData }) => {
//   //   const form = useForm({
//   //     resolver: zodResolver(FormSchema),
//   //     defaultValues: {
//   //       weight_value: 0,
//   //       weight_unit: "",
//   //       distance_value: 0,
//   //       distance_unit: "",
//   //       transport_method: "",
//   //     },
//   //   });

//   //   const onSubmit = async (data) => {
//   //     try {
//   //       console.log("Form submitted:", data);
//   //       const body = {
//   //         type: "shipping",
//   //         ...data,
//   //       };

//   //       console.log(body);

//   //       const apiKey = "tQwZxNs9meZ43GhGJvQ6UA";
//   //       const response = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "Authorization": `Bearer ${apiKey}`,
//   //         },
//   //         body: JSON.stringify(body),
//   //       });

//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! Status: ${response.status}`);
//   //       }

//   //       const shippingData = await response.json();
//   //       console.log("Response data:", shippingData);
//   //       handleShippingData(shippingData);

//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   };

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center ">
//         {/* <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 text-blue-600">
//             <FormField
//               control={form.control}
//               name="weight_value"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Weight value</FormLabel>
//                   <Input
//                     type="number"
//                     placeholder="200"
//                     value={field.value}
//                     onChange={(e) => field.onChange(parseInt(e.target.value))}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="weight_unit"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Weight unit</FormLabel>
//                   <Input
//                     type="text"
//                     placeholder="g"
//                     value={field.value}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="distance_value"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Distance value</FormLabel>
//                   <Input
//                     type="number"
//                     placeholder="2000"
//                     value={field.value}
//                     onChange={(e) => field.onChange(parseFloat(e.target.value))}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="distance_unit"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Distance unit</FormLabel>
//                   <Input
//                     type="text"
//                     placeholder="km"
//                     value={field.value}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="transport_method"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Transport method</FormLabel>
//                   <Input
//                     type="text"
//                     placeholder="truck"
//                     value={field.value}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Save</Button>
//           </form>
//         </Form> */}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 text-blue-600">
//             <label

//               htmlFor="weightValue"
//               className="block text-white-800 font-semibold mb-2 text-blue-600"
//               // style={{ color: "#ffff" }}
//             >
//               Weight
//             </label>
//             <input
//               type="number"
//               className="px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full text-blue-600"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="weightUnit"
//               className="block text-white-800 font-semibold mb-2"
//               style={{ color: "#ffff" }}
//             >
//               Weight Unit
//             </label>
//             <select
//               id="weightUnit"
//               name="weightUnit"
//               value={inputValues.weightUnit}
//               onChange={handleInputChange}
//               className="px-3 py-2 border border-green-500 rounded-md  focus:outline-none focus:border-green-700 w-full text-blue-600"
//             >
//               <option value="kg">kg</option>
//               <option value="g">g</option>
//               <option value="lb">lb</option>
//               <option value="mt">mt</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="distanceValue"
//               className="block text-white-800 font-semibold mb-2"
//               style={{ color: "#ffff" }}
//             >
//               Distance
//             </label>
//             <input
//               type="number"
//               id="distanceValue"
//               name="distanceValue"
//               value={inputValues.distanceValue}
//               onChange={handleInputChange}
//               className="px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full text-blue-600"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="distanceUnit"
//               className="block text-white-800 font-semibold mb-2"
//               style={{ color: "#ffff" }}
//             >
//               Distance Unit
//             </label>
//             <select
//               id="distanceUnit"
//               name="distanceUnit"
//               value={inputValues.distanceUnit}
//               onChange={handleInputChange}
//               className="px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full text-blue-600"
//             >
//               <option value="km">km</option>
//               <option value="mi">mi</option>
//             </select>
//           </div>

//           {/* Transport Method selection */}
//           <div className="mb-4">
//             <label
//               htmlFor="transportMethod"
//               className="block text-white-800 font-semibold mb-2"
//               style={{ color: "#ffff" }}
//             >
//               Means of Transport
//             </label>
//             <input
//               type="text"
//               id="transportMethod"
//               name="transportMethod"
//               value={inputValues.transportMethod}
//               onChange={handleInputChange}
//               className="px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full text-blue-600"
//             />
//           </div> 

//           {/* Submit button */}
//           <button
//             type="submit"
//             className="bg-[#245501] text-white px-4 py-2 rounded-md"
//           >
//             Calculate Carbon Estimate
//           </button>
//         </form>


//         {carbonEstimate && (
//         <div>
//           <h2 className="text-lg font-medium" style={{ color: "#ffff" }}>
//             Estimate Data
//           </h2>
//           <p style={{ color: "#ffff" }}>Carbon: {carbonEstimate.carbon_g} g</p>
//           <p style={{ color: "#ffff" }}>
//             Carbon: {carbonEstimate.carbon_lb} lb
//           </p>
//           <p style={{ color: "#ffff" }}>
//             Carbon: {carbonEstimate.carbon_kg} kg
//           </p>
//           <p style={{ color: "#ffff" }}>
//             Carbon: {carbonEstimate.carbon_mt} metric tons
//           </p>
//           <p style={{ color: "#ffff" }}>
//             Distance: {carbonEstimate.distance_unit}
//           </p>
//           <p style={{ color: "#ffff" }}>
//             Distance Value: {carbonEstimate.distance_value}
//           </p>
//           <p style={{ color: "#ffff" }}>
//             Distance: {carbonEstimate.distance_unit}
//           </p>

//           <p style={{ color: "#ffff" }}>
//             Estimated At: {carbonEstimate.estimated_at}
//           </p>
//         </div>
//       )}
//       </div>
//     </>
//   );
// };

// export default Shipping;
import React, { useState, useEffect } from "react";
const apiKey = "yIntFgYVaWEOFdZmam5w";

const Shipping = ({handleShippingData,handletype}) => {
  // State to store the carbon estimate data
  // const [carbonEstimate, setCarbonEstimate] = useState(null);
  // State to store input values
  const [inputValues, setInputValues] = useState({
    weightValue: "",
    weightUnit: "g",
    distanceValue: "",
    distanceUnit: "km",
    transportMethod: "truck", // Default transport method
  });

  // Function to fetch carbon estimate data from the API
  const fetchCarbonEstimate = async () => {
    const url = "https://www.carboninterface.com/api/v1/estimates";

    // Data to be sent in the POST request, including input values from state
    const data = {
      type: "shipping",
      weight_value: inputValues.weightValue,
      weight_unit: inputValues.weightUnit,
      distance_value: inputValues.distanceValue,
      distance_unit: inputValues.distanceUnit,
      transport_method: inputValues.transportMethod,
    };
   handletype( data.type)

    // Options for the POST request
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      // Fetch data from the API
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data.attributes.carbon_g)
      console.log(result.data.type)
      // console.log(result.data.attributes)
      // const shippingData=result.data.attributes
      handleShippingData(result); // Update state with the fetched data
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchCarbonEstimate();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // Function to handle changes in input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchCarbonEstimate(); // Fetch carbon estimate data
  };

  return (
    <div className="p-4 rounded-md">
      {/* Title */}
      <h1
        className="text-green-800 text-2xl font-bold mb-4"
        style={{ color: "#ffff" }}
      >
        Carbon Estimate
      </h1>

      {/* Input fields */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="weightValue"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Weight
          </label>
          <input
            type="number"
            id="weightValue"
            name="weightValue"
            value={inputValues.weightValue}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="weightUnit"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Weight Unit
          </label>
          <select
            id="weightUnit"
            name="weightUnit"
            value={inputValues.weightUnit}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="lb">lb</option>
            <option value="mt">mt</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="distanceValue"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Distance
          </label>
          <input
            type="number"
            id="distanceValue"
            name="distanceValue"
            value={inputValues.distanceValue}
            onChange={handleInputChange}
            className="px-3 py-2  text-blue-600 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="distanceUnit"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Distance Unit
          </label>
          <select
            id="distanceUnit"
            name="distanceUnit"
            value={inputValues.distanceUnit}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          >
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </div>

        {/* Transport Method selection */}
        <div className="mb-4">
          <label
            htmlFor="transportMethod"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Means of Transport
          </label>
          <input
            type="text"
            id="transportMethod"
            name="transportMethod"
            value={inputValues.transportMethod}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-[#245501] text-white px-4 py-2 rounded-md"
        >
          Calculate Carbon Estimate
        </button>
      </form>

      {/* Carbon estimate result */}
    
    </div>
  );
};

export default Shipping;