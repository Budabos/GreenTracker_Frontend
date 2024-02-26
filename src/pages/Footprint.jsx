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



  const  onSubmit = async (data) => {
    console.log("Form  submitted:", data)
   
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
        // try {
        // const response = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(values),
        // });
  }
  // const onSubmit = async (data) => {
  //     try {
  //       const response = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(values),
  //       });

  //       const data = await response.json();
        // Handle the response data accordingly
      //   if (data.success) {
      //     localStorage.setItem("token", data.token);
      //     localStorage.setItem("user", data.user_email);

      //     console.log(localStorage.getItem("token"));
      //     // Redirect to dashboard
      //     navigate('/dashboard')

      //     toast.success("Login successful");
      //   } else {
      //     // Login failed, show error toast
      //     toast.error(`Login failed: ${data.message}`);
      //     console.error("Login failed:", data.message);
      //   }
      // } catch (error) {
      //   console.log(error);
      //   toast.error(error.response.data.message);
      // }
    // };




  return (
    // <div>{data}</div>
    <>
      <div className="min-h-screen flex">
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




                  <Button type="submit">Submit</Button>
                </form>
              </Form>


            </div>
          </div>


        </div>


        <div className="flex-1 p-12 flex items-center justify-center">
          <div className="max-w-md">
            hey
          </div>

        </div>
      </div>

    </>
  )
}

export default Footprint