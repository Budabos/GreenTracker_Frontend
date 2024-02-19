import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BASE_URL, cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { redirect, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const donationsSchema = z.object({
  purpose: z.string({
    required_error: "Purpose is required",
  }),
  amount: z
    .string({
      required_error: "Amount is required",
    })
    .transform((val) => parseInt(val)),
  date: z.date({
    required_error: "A date is required.",
  }),
});

const Donation = () => {
  // const [selectedOption, setSelectedOption] = useState("");
  // const [customCause, setCustomCause] = useState("");

  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  //   setCustomCause(""); // Reset custom cause when an option is selected from the dropdown
  // };

  // const handleCustomCauseChange = (event) => {
  //   setCustomCause(event.target.value);
  //   setSelectedOption(""); // Reset selected option when custom cause is entered
  // };

  const { getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const form = useForm({
    resolver: zodResolver(donationsSchema),
    defaultValues: {
      amount: "",
      purpose: "",
    },
  });

  const purpose = form.watch("purpose");

  const { mutate, isPending } = useMutation({
    mutationKey: ["donations"],
    mutationFn: async (values) => {
      const response = await axios
        .post(`${BASE_URL}/donations`, values)
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
        })
        .catch((err) => {
          console.error(err);
        });

      return response;
    },
  });

  function onSubmit(values) {
    mutate({
      ...values,
      user_id: user.id,
    });
  }

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2021/08/01/08/01/ecology-6513805_640.jpg")',
            filter: "brightness(0.6)", // Adjust the value to make it darker (0.7 is just an example)
          }}
        ></div>
        <div className="p-12 text-white flex items-center justify-center h-full relative z-10">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">GreenTrackr Donations</h2>
            <p className="text-lg">Donate to a purpose</p>
            {/* Longer statement emphasizing the importance of donating */}
            <p className="text-sm text-gray-300 mt-2">
              Making a donation is more than just giving money; it's about
              making a positive impact on the world around us. By donating to a
              purpose, you're contributing to the greater good and helping those
              in need. Make a difference today!
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 pl-6 flex justify-center mt-12 mb-8">
        <div className="w-[24rem]">
          <h2 className="text-3xl font-bold mb-8">Make a Donation</h2>
          {/* Your donation form here */}
        
          {/* donation form here */}

          {/* purpose input */}
         {/* <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="purpose"
              >
                Purpose
              </label>
              <div className="relative">
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="purpose"
                  required
                  value={selectedOption}
                  onChange={handleSelectChange}
                  disabled={!!customPurpose}
                >
                  <option value="" disabled>
                    Select or Type a Purpose
                  </option>
                  <option value="environment">
                    Environmental Conservation
                  </option>
                  <option value="education">Education for All</option>
                  <option value="health">Healthcare Support</option>
                  <option value="poverty">Poverty Alleviation</option>
                  <option value="animal">Animal Welfare</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="customPurpose"
              >
                Or Enter Custom Purpose
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  selectedOption && "cursor-not-allowed"
                }`}
                id="customPurpose"
                type="text"
                placeholder="Custom Purpose"
                value={customPurpose}
                onChange={handleCustomPurposeChange}
                disabled={!!selectedOption}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                type="number"
                placeholder="Amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>

             
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                placeholder="Date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Donate Now
              </button>
            </div>
          </form> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div
                className={purpose === "custom" && "flex items-center gap-6"}
              >
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem className={purpose === "custom" && "w-1/2"}>
                      <FormLabel>Purpose</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pick a purpose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Animal Welfare">
                            Animal Welfare
                          </SelectItem>
                          <SelectItem value="Poverty Alleviation">
                            Poverty Alleviation
                          </SelectItem>
                          <SelectItem value="Healthcare Support">
                            Healthcare Support
                          </SelectItem>
                          <SelectItem value="Education for All">
                            Education for All
                          </SelectItem>
                          <SelectItem value="Environmental Conservation">
                            Environmental Conservation
                          </SelectItem>
                          <SelectItem value="custom">Custom purpose</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {purpose === "custom" && (
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem className={purpose === "custom" && "w-1/2"}>
                        <FormLabel>Custom purpose</FormLabel>
                        <FormControl>
                          <Input placeholder="custom purpose" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                className="bg-black text-white"
                type="submit"
              >
                {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Donation;
