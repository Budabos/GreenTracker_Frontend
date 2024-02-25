import { useAuth } from "@/providers/AuthProvider";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const reviewSchema = z.object({
  rating: z.string().transform((val) => parseInt(val)),
  review_text: z.string().min(2, {
    message: "Review text must be at least 2 characters",
  }),
});

const ReviewForm = ({ product, refetch }) => {
  const { getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: "",
      review_text: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: async (values) => {
      return await axios
        .post(`${BASE_URL}/reviews`, values)
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
          refetch();
        })
        .catch((err) => console.log(err));
    },
  });

  function onSubmit(values) {
    mutate({ ...values, product_id: product.id, user_id: user.id });
  }

  return (
    <Dialog>
      {user && (
        <DialogTrigger>
          <Button className="bg-black text-white">Add review</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add review for {product.name}
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 pt-4"
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate out of 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="review_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="This is really cool :)"
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
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
