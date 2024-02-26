import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import FootprintDisplay from "@/components/FootprintDisplay"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { data } from "autoprefixer"




const FormSchema = z.object({
  departureFrom: z
    .string({
      required_error: "Please select an departure airport code.",
    }),
  destination: z
    .string({
      required_error: "Please select an destination airport code.",
    }),
  return: z.boolean().default(false).optional(),

  passengers: z.number().default(1)
});

const airports = [
  { name: "Aarhus", country: "Denmark", code: "AAR" },
  { name: "Abadan", country: "Iran", code: "ABD" },
  { name: "Abeche", country: "Chad", code: "AEH" },
  { name: "Aberdeen", country: "United Kingdom", code: "ABZ" },
  { name: "Aberdeen (SD)", country: "USA", code: "ABR" },
  { name: "Abidjan", country: "Cote d'Ivoire", code: "ABJ" },
  { name: "Abilene (TX)", country: "USA", code: "ABI" }
];



const Footprint = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      return: false,
      passengers: 2,
      destination: "",
      departureFrom: "",
    },
  })

  const [resData, setResData] = useState([]);

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);
      const body = {
        type: "flight",
        passengers: data.passengers,
        legs: []
      };
      body.legs.push({ "departure_airport": data.departureFrom, "destination_airport": data.destination });
      if (data.return) {
        body.legs.push({ "departure_airport": data.destination, "destination_airport": data.departureFrom });
      }
  
      console.log(body);
  
      const apiKey = "tQwZxNs9meZ43GhGJvQ6UA"; 
      const response = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const Data = await response.json();
      console.log("Response data:", Data.data.attributes.carbon_g);
      console.log("Response data:", Data.data.attributes.distance_value)
      console.log("Response data:", Data.data.attributes.estimated_at
      )

      const carbonData = Data.data.attributes
      setResData(carbonData)
    } catch (error) {
      console.error("Error:", error);
 
    }
  };





  return (
    // <div>{data}</div>
    <>
   
        <div className="relative flex-1 px-2">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1697597699447-804b85782fec?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              filter: "brightness(0.6)", // Adjust the value to make it darker (0.7 is just an example)
            }}
          >
          </div>
          <div className="text-white flex justify-center items-center  h-full relative">
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-3xl font-bold mb-4">GreenTrackr </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 text-blue-600">
                  <FormField
                    control={form.control}
                    name="departureFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure airport</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Departure Airport code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {airports.map((airport, index) => (
                              <SelectItem key={index} value={airport.code}>
                                {airport.code} - {airport.name} ({airport.country})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination airport</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Destination Airport code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {airports.map((airport, index) => (
                              <SelectItem key={index} value={airport.code}>
                                {airport.code} - {airport.name} ({airport.country})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passengers</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2"
                            value={field.value}
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                          />
                        </FormControl>

                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="return"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormLabel>Return ticket</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>

                          </FormLabel>

                        </div>
                      </FormItem>
                    )}
                  />




                  <Button type="submit">Save and continue</Button>
                </form>
              </Form>


            </div>
          </div>


        </div>


        <div className="flex-1 p-12 flex items-center justify-center">
          <div className="max-w-md">
          
            <Card>
            <CardHeader>
                <CardTitle>Flight Footprint</CardTitle>
                <CardDescription>Estimated at :{resData.estimated_at}</CardDescription>
                <CardDescription>Carbon :{resData.carbon_g} g</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <p>{attributes.}</p> */}
                <p>Distance value : {resData.distance_value} kms</p>
                {/* <p>{resData.attributes.legs.destination_airport}</p> */}
            </CardContent>
            <CardFooter>
                {/* <p>{resData.attributes.estimated_at}</p> */}
            </CardFooter>
        </Card>
          </div>

        </div>
      </div>

    </>
  )
}

export default Footprint



// {
//   "data": {
//     "id": "d60edacc-cf6c-4da7-b5de-c538de4ce5ee",
//     "type": "estimate",
//     "attributes": {
//       "passengers": 2,
//       "legs": [
//         {
//           "departure_airport": "SFO",
//           "destination_airport": "YYZ"
//         },
//         {
//           "departure_airport": "YYZ",
//           "destination_airport": "SFO"
//         }
//       ],
//       "estimated_at": "2020-07-24T02:25:50.837Z",
//       "carbon_g": 1077098,
//       "carbon_lb": 2374,
//       "carbon_kg": 1077,
//       "carbon_mt": 1,
//       "distance_unit": "km",
//       "distance_value": 7454.15
//     }
//   }
// }

// data.id
// data.type
// data.attributes.legs.destination_airport
// data.attributes.estimated_a