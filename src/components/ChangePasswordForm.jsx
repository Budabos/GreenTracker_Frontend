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

const passwordSchema = z
  .object({
    current_password: z.string(),
    new_password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.confirm_password === data.new_password, {
    message: "Confirm password and new password do not match",
    path: ["confirm_password"],
  });

const ChangePasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { getUser } = useAuth();
  const user = getUser();

  const { mutate, isPending } = useMutation({
    mutationKey: ["password"],
    mutationFn: async (values) => {
      // await axios
      //   .post(`${BASE_URL}/users/${user.id}`, values)
      //   .then((res) => {
      //     toast.success(res.data.message);
      //     form.reset();
      //   })
      //   .catch((err) => console.log(err));
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl"
      >
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
