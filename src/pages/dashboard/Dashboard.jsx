import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      return axios
        .get(`${BASE_URL}/summary`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

  if (isLoading || !summary) {
    return (
      <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Fetching summary...
      </div>
    );
  }

  return (
    <div className="my-8 px-8 flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Summary</h1>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-10">
        {Object.keys(summary).map((key) => (
          <Card>
            <CardHeader>
              <CardTitle>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </CardTitle>
              <CardDescription>
                Number of {key}: {summary[key]}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
