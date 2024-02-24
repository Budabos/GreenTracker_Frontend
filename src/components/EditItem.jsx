import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "./AddProduct";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const EditItem = ({ item, isPending, action }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: convertValuesToString(item),
  });

  function onSubmit(values) {
    action([item.id, values]);
  }

  function convertValuesToString(obj) {
    const newObj = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        newObj[key] = String(obj[key]);
      }
    }
    return newObj;
  }

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Edit {item.name}</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 grid"
            >
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(item)
                  .filter((entry) => !["reviews", "id"].includes(entry[0]))
                  .map((entry) => (
                    <FormField
                      control={form.control}
                      name={entry[0]}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{entry[0]}</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
              </div>
              <div className="flex items-center justify-end">
                <Button disabled={isPending} type="submit">
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default EditItem;
