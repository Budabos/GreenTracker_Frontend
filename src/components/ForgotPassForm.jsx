import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";

// Define Zod schema for form validation
const forgotPasswordSchema = z.object({
  email: z.string().email(), // Email field should be a valid email
});

// Component for Forgot Password Form
const ForgotPassForm = () => {
  // Initialize useForm hook with Zod resolver and default values
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // useMutation hook for handling form submission
  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (values) => {
      return await axios
        .post(`${BASE_URL}/forgot-password`, values) // Send POST request to forgot-password endpoint
        .then((res) => {
          toast.success(res.data.message);
          form.reset(); // Reset form after successful submission
        })
        .catch((err) => {
          toast.error(err.response.data.message); // Display error message if submission fails
        });
    },
  });

  // Function to handle form submission
  function onSubmit(values) {
    mutate(values); // Call mutation function with form values
  }

  return (
    <Form {...form}>
      {/* Form wrapper */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start">
          <Link
            {/* Links for existing and new users */}
            to={"/login"}
            className={cn(
              buttonVariants({
                variant: "link",
              }),
              "pl-0"
            )}
          >
            Already have an account?
          </Link>
          <Link
            to={"/signup"}
            className={cn(
              buttonVariants({
                variant: "link",
              }),
              "pl-0"
            )}
          >
            Don&apos;t have an account?
          </Link>
          {/* Submit button */}
          <Button
            className="bg-black text-white"
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassForm;
