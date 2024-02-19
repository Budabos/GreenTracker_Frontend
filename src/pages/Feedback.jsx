import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/lib/utils";
import { toast } from "sonner";

const feedbackSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email(),
  feedback_message: z.string({
    required_error: "Feedback message is required",
  }),
});

const FeedbackForm = () => {
  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback_message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["feedback"],
    mutationFn: async (values) => {
      await axios
        .post(`${BASE_URL}/feedback`, values)
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
        })
        .catch((err) => toast.error(err.data.message));
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <div className="max-w-md my-10 mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">We'd Love Your Feedback</h2>
      {/* <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your feedback"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Submit Feedback
        </button>
      </form> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="feedback_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="text-white bg-black"
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
