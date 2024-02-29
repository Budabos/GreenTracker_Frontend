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
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

// Component for Login Form
const LoginForm = () => {
  const [hidden, setHidden] = useState(true);
  const { setUserCred, getUser } = useAuth();
  const navigate = useNavigate();

  // useMutation hook for handling form submission
  const {
    data: res,
    isPending,
    mutate,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => {
      // Send POST request to login endpoint
      const res = await axios
        .post(`${BASE_URL}/login`, values)
        // Set user credentials and show success message
        .then((res) => {
          setUserCred(JSON.stringify(res.data));

          toast.success(res.data.message);
          // Redirect user based on role
          if (res.data.user.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        })
        .catch((err) => toast.error(err.response.data.message)); // Show error message if login fails

      return res;
    },
  });
  // Initialize useForm hook with Zod resolver and default values
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Function to handle form submission
  function onSubmit(values) { 
    mutate(values); // Call mutation function with form values
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* Input field for password with visibility toggle */}
                <div className="relative">
                  <Input
                    type={hidden ? "password" : "text"}
                    placeholder="secret-password"
                    {...field}
                  />
                  {/* Button for toggling password visibility */}
                  <Button
                    className="absolute top-1/2 right-0 translate-y-[-50%] border"
                    size="icon"
                    type="button"
                    onClick={() => setHidden((prev) => !prev)}
                  >
                    {hidden ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start">
          <Link
            {/* Links for password recovery and sign up */}
            to={"/forgot-password"}
            className={cn(
              buttonVariants({
                variant: "link",
              }),
              "pl-0"
            )}
          >
            Forgot password?
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
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
