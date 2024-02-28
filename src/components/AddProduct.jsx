import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

// Define the schema for the product
export const productSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  price: z
    .string()
    .min(1, {
      message: "Price is required",
    })
    .transform((val) => parseInt(val)),
  eco_rating: z
    .string()
    .min(1, {
      message: "Eco rating is required",
    })
    .transform((val) => parseInt(val)),
  image_url: z.string().min(1, {
    message: "Image url is required",
  }),
});

// Initialize React Hook Form with the Zod resolver
const AddProduct = ({  setProducts }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
  });

  // Use React Query's useMutation hook
  const { mutate, isPending } = useMutation({
    mutationKey: ["products"],

    // Define the mutation function to handle adding a product
    mutationFn: async (values) => {
      return await axios
        .post(`${BASE_URL}/products`, values)   // Send a POST request to the server to add the product
        .then((res) => {
          // Display a success toast message
          toast.success(res.data.message);
          // Reset the form fields
          form.reset();
          // Update the list of products
          setProducts((prevProducts) => [...prevProducts, res.data.product]);
        })

        // Log any errors that occur
        .catch((err) => console.log(err));
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create a product
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="bamboo wrappers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          placeholder="Reusable cleaning cloths made from sustainable bamboo fiber, perfect for wiping surfaces and reducing paper towel waste."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-6 *:w-1/2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Home and Kitchen" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://unsplash.com/smflw..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-6 *:w-1/2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="1500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eco_rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eco rating</FormLabel>
                        <FormControl>
                          <Input placeholder="5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={isPending} type="submit">
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
