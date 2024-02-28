
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const FormSchema = z.object({
//   distance_unit: z
//     .string({
//       required_error: "Please select a distance unit.",
//     }),
//   distance_value: z
//     .number({
//       required_error: "Please enter a valid distance value.",
//     }),
//   vehicle_model_id: z
//     .string({
//       required_error: "Please enter a vehicle model ID.",
//     }),
// });

// const Vehicles = ({ handleVehicleData }) => {
//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       distance_unit: "",
//       distance_value: 0,
//       vehicle_model_id: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log("Form submitted:", data);
//       const body = {
//         type: "vehicle",
//         ...data,
//       };

//       console.log(body);

//       const apiKey = "tQwZxNs9meZ43GhGJvQ6UA";
//       const response = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const vehicleData = await response.json();
//       console.log("Response data:", vehicleData);
//       handleVehicleData(vehicleData);

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//           <div className="flex flex-col justify-center items-center ">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 text-blue-600">
//             <FormField
//               control={form.control}
//               name="distance_unit"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Distance unit</FormLabel>
//                   <Input
//                     type="text"
//                     placeholder="mi"
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
//                     placeholder="100"
//                     value={field.value}
//                     onChange={(e) => field.onChange(parseInt(e.target.value))}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="vehicle_model_id"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Vehicle model ID</FormLabel>
//                   <Input
//                     type="text"
//                     placeholder="7268a9b7-17e8-4c8d-acca-57059252afe9"
//                     value={field.value}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Save</Button>
//           </form>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Vehicltes;
import React, { useState } from "react";
import VehicleMakeSelect from "./Vehiclecomponents/VehicleMakeSelect";
import VehicleModelSelect from "./Vehiclecomponents/VehicleModelSelect";
import EstimateForm from "./Vehiclecomponents/EstimateForm";

const Vehicles = ({handleVehicleData}) => {
  const [selectedMakeId, setSelectedMakeId] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleMakeSelect = (makeId) => {
    setSelectedMakeId(makeId);
    setSelectedModel(null); // Reset selected model when make changes
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  return (
    <div>
      <h2 style={{ color: "#ffff" }}>Vehicle Information</h2>
      <VehicleMakeSelect onSelect={handleMakeSelect} />
      {selectedMakeId && (
        <VehicleModelSelect
          makeId={selectedMakeId}
          onSelect={handleModelSelect}
        />
      )}
      {selectedModel && <EstimateForm model={selectedModel} handleVehicleData={handleVehicleData} />}
    </div>
  );
};

export default Vehicles;