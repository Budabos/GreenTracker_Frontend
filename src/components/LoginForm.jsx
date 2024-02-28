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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const LoginForm = () => {
  const [hidden, setHidden] = useState(true);
  const { setUserCred, getUser } = useAuth();
  const navigate = useNavigate();

  const {
    data: res,
    isPending,
    mutate,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => {
      const res = await axios
        .post(`${BASE_URL}/login`, values)
        .then((res) => {
          setUserCred(JSON.stringify(res.data));

          toast.success(res.data.message);

          if (res.data.user.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        })
        .catch((err) => toast.error(err.response.data.message));

      return res;
    },
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    mutate(values);
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

export default LoginForm;
