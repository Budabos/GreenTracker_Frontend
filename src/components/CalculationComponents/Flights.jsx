
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



const Flights = ({handleFlightData}) => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            return: false,
            passengers: 2,
            destination: "",
            departureFrom: "",
        },
    })

  

    const onSubmit = async (data) => {
        try {
            // console.log("Form submitted:", data);
            const body = {
                type: "flight",
                passengers: data.passengers,
                legs: []
            };
            body.legs.push({ "departure_airport": data.departureFrom, "destination_airport": data.destination });
            if (data.return) {
                body.legs.push({ "departure_airport": data.destination, "destination_airport": data.departureFrom });
            }

            // console.log(body);

            const apiKey = "KYhhJrQclnJmPFzA4BEgZA	";
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

            const flightData = await response.json();
            console.log("Response data:", flightData.data.attributes.carbon_g);
            console.log("Response data:", flightData.data.attributes.distance_value)
            console.log("Response data:", flightData.data.attributes.estimated_at
            )

            handleFlightData(flightData,"Flight")
          
        } catch (error) {
            console.error("Error:", error);

        }
    };





    return (

        <>

            <div className="flex flex-col justify-center items-center ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 text-blue-600">
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




                        <Button type="submit">Save</Button>
                    </form>
                </Form>


            </div >

        </>
    )
}

export default Flights



