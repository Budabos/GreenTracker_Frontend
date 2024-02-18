import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const LoginForm = () => {
  const [hidden, setHidden] = useState(true);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={hidden ? "password" : "text"}
                    placeholder="secret-password"
                    {...field}
                  />
                  <Button
                    className="absolute top-1/2 right-0 translate-y-[-50%] border text-black"
                    size="icon"
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
          <Button className="bg-black text-white" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
