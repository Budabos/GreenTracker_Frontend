
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  electricity_value: z
    .number({
      required_error: "Please enter a valid electricity value.",
    }),
  country: z
    .string({
      required_error: "Please select a country.",
    }),
  state: z
    .string({
      required_error: "Please select a state.",
    }),
});

const Electricity = ({ handleElectricityData }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      electricity_value: 0,
      country: "",
      state: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);
      const body = {
        type: "electricity",
        electricity_unit: "mwh",
        "electricity_value": data.electricity_value,
        "country": data.country,
        "state": data.state
      };

      console.log(body);

      const apiKey = "KYhhJrQclnJmPFzA4BEgZA		";
      const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
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
      const result = await response.json();
      console.log(result)
      handleElectricityData(result,"Electricity");

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
              name="electricity_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Electricity value (mwh)</FormLabel>
                  <Input
                    type="number"
                    placeholder="42"
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    placeholder="us"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    placeholder="fl"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>

          </form>
        </Form>
      </div>
    </>
  );
};

export default Electricity;
