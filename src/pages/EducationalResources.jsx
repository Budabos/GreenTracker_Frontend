import ResourceForm from "@/components/ResourceForm";
import { BASE_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const EducationalResources = () => {
  const {
    data: resources,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["educational-resources"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/education-resources`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

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

  if (isLoading || !resources) {
    return (
      <div className="flex items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Loading products...
      </div>
    );
  }

  console.log(resources == undefined);

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
          <ResourceForm refetch={refetch} />
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
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;
