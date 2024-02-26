import { Button, buttonVariants } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";

const signupSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters",
    }),
    email: z.string().email(),
    phone: z.string().transform((val) => parseInt(val)),
    gender: z.string(),
    age: z.string().transform((val) => parseInt(val)),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Password and confirm password do not match",
  });

const SignupForm = () => {
  const [hidden, setHidden] = useState(true);
  const [interests, setInterests] = useState(["climate"]);

  const interestOptions = [
    {
      text: "Climate",
      value: "climate",
    },
    {
      text: "Eco-products",
      value: "eco-friendly products",
    },
  ];

  const { setUserCred, getUser } = useAuth();

  const navigate = useNavigate();

  const {
    data: res,
    isPending,
    mutate,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values) => {
      console.log(values);
      await axios
        .post(`${BASE_URL}/signup`, values)
        .then((res) => {
          setUserCred(JSON.stringify(res.data));

          toast.success(res.data.message);
          navigate("/");
        })
        .catch((err) => toast.error(err.response.data.message));
    },
  });

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    mutate({ ...values, interests: interests.join(","), role: "member" });
    SendWelcomeMail.send(values.email);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="21" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2 w-1/2">
            <Label>Interests</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Input
                  className="cursor-pointer"
                  value={
                    interests.length > 0
                      ? `${interests.length} interests selected`
                      : "Pick your interests"
                  }
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Interest list</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {interestOptions.map(({ text, value }) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={value}
                      checked={
                        interests.find((interest) => interest === value)
                          ? true
                          : false
                      }
                      onCheckedChange={() => {
                        if (interests.find((interest) => interest === value)) {
                          setInterests(() => {
                            return interests.filter((int) => int !== value);
                          });
                        } else {
                          setInterests([...interests, value]);
                        }
                      }}
                    >
                      {text}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-1/2">
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
                      type="button"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Confirm Password</FormLabel>
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
                      type="button"
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
        </div>
        <div className="flex flex-col items-start">
          <Link
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

export default SignupForm;
