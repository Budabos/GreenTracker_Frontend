

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const FormSchema = z.object({
  weight_value: z
    .number({
      required_error: "Please enter a valid weight value.",
    }),
  weight_unit: z
    .string({
      required_error: "Please select a weight unit.",
    }),
  distance_value: z
    .number({
      required_error: "Please enter a valid distance value.",
    }),
  distance_unit: z
    .string({
      required_error: "Please select a distance unit.",
    }),
  transport_method: z
    .string({
      required_error: "Please select a transport method.",
    }),
});

const Shipping = ({ handleShippingData }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      weight_value: 0,
      weight_unit: "",
      distance_value: 0,
      distance_unit: "",
      transport_method: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);
      const body = {
        type: "shipping",
        ...data,
      };

      console.log(body);

      const apiKey = "tQwZxNs9meZ43GhGJvQ6UA";
      const response = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const shippingData = await response.json();
      console.log("Response data:", shippingData);
      handleShippingData(shippingData);

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
              name="weight_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight value</FormLabel>
                  <Input
                    type="number"
                    placeholder="200"
                    value={field.value}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight unit</FormLabel>
                  <Input
                    type="text"
                    placeholder="g"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distance_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance value</FormLabel>
                  <Input
                    type="number"
                    placeholder="2000"
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distance_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance unit</FormLabel>
                  <Input
                    type="text"
                    placeholder="km"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transport_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport method</FormLabel>
                  <Input
                    type="text"
                    placeholder="truck"
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

export default Shipping;
