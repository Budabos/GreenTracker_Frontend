import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resourceSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, {
      message: "Title must be at least 2 characters",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(5, {
      message: "Description must be at least 5 characters",
    }),
  image_url: z.string({
    required_error: "Image url is required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  content: z.string({
    required_error: "Content is required",
  }),
  author: z.string({
    required_error: "Author is required",
  }),
  date_published: z.date({
    required_error: "Date published is required",
  }),
});

const ResourceForm = ({ refetch }) => {
  const form = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      category: "",
      content: "",
      author: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["resource"],
    mutationFn: async (values) => {
      return await axios
        .post(`${BASE_URL}/education-resources`, values)
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
          refetch();
        });
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="All about climate" {...field} />
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
                  placeholder="Type your description here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Global warming" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your content here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-8">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Image url</FormLabel>
                <FormControl>
                  <Input placeholder="https://image.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_published"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending} type="submit">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ResourceForm;
