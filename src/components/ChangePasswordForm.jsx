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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Define schema for password change form
const passwordSchema = z
  .object({
    current_password: z.string().min(1, {
      message: "Current password is required",
    }),
    new_password: z.string().min(1, {
      message: "New password is required",
    }),
    confirm_password: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  // Add refinement to ensure new password and confirm password match
  .refine((data) => data.confirm_password === data.new_password, {
    message: "Confirm password and new password do not match",
    path: ["confirm_password"],
  });

// Define ChangePasswordForm component
const ChangePasswordForm = () => {
  // Initialize form with useForm hook
  const form = useForm({
    resolver: zodResolver(passwordSchema), // Use zodResolver for form validation
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  // Get authenticated user information
  const { getUser } = useAuth();
  const user = getUser();

  // Initialize mutation function with useMutation hook
  const { mutate, isPending } = useMutation({
    mutationKey: ["password"],
    mutationFn: async (values) => {
      // Perform HTTP patch request to change password
      await axios
        .patch(`${BASE_URL}/change_password/${user.id}`, values)
        .then((res) => {
          toast.success(res.data.message); // Show success message
          form.reset(); // Reset form after successful password change
        })
        .catch((err) => toast.error(err.response.data.message)); // Show error message if request fails
    },
  });

  // Handle form submission
  function onSubmit(values) {
    mutate(values);
  }

  // Render the password change form
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl"
      >
        {/* Current password field */}
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input placeholder="secret-password;)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* New password field */}
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="secret-password;)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Confirm password field */}
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="secret-password;)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit button */}
        <Button
          disabled={isPending}
          className="bg-black text-white"
          type="submit"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
