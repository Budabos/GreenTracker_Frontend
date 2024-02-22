import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

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

const EducationalResources = () => {
  const { data: resources, isLoading } = useQuery({
    queryKey: ["educational-resources"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/education-resources`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

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

  function onSubmit(values) {
    console.log(values);
  }

  const ResourceCard = ({ resource }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
      <img
        src={resource.image_url}
        alt={resource.title}
        className="w-full h-auto mb-2"
      />
      <p className="text-gray-700 mb-2">{resource.description}</p>
      <p className="text-black mb-2">
        <strong>Author:</strong> {resource.author}
      </p>
      <p className="mb-2">{resource.content}</p>
      <p className="text-black">
        <strong>Date Published:</strong> {resource.date_published}
      </p>
    </div>
  );

  return (
    <div className="bg-white-100 p-8">
      <h1 className="text-4xl text-black mb-6 font-bold">
        You need to Know this!!
      </h1>
      {/* Displaying the available resources */}
      <div className="flex">
        <div className="w-1/2">
          <img
            src="https://climate.nasa.gov/system/internal_resources/details/original/1209_shutterstock_88550854.jpg"
            alt="Climate Image"
            className="max-w-full h-auto pr-4 rounded"
            style={{ height: "100%" }}
          />
        </div>
        <div className="w-1/2 pr-8">
          <h2 className="text-2xl text-black mb-4 font-bold">
            Add New Resource
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#ecfccb",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
          backdropFilter: "blur(90px)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 className="text-2xl text-black mb-4 font-bold">
            Available Resources
          </h1>
        </div>
        <div className="flex flex-wrap">
          {isLoading || !resources ? (
            <div className="w-[90vw] h-32 flex items-center justify-center text-2xl">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              No product reviews yet
            </div>
          ) : (
            resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;
