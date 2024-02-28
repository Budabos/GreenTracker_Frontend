import { Button, buttonVariants } from "@/components/ui/button";
import { BASE_URL, cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Events = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  // Dummy data as a fallback
  const dummyEvents = [
    {
      id: 1,
      title: "World Earth Day",
      date_event: "April 22, 2024",
      location: "Nairobi",
      description:
        "World Earth Day is an annual event celebrated on April 22nd, dedicated to promoting environmental awareness and action to protect the planet. It serves as a reminder of the importance of environmental conservation and sustainability practices to safeguard Earth's natural resources for future generations. ",
      organizer: "John Doe",
      contact_info: "john.doe@example.com",
      registration_deadline: "2023-12-31", // Date format: YYYY-MM-DD
    },
    {
      id: 2,
      title: "World Environment Day",
      date_event: "June 5, 2024",
      location: "Nairobi",
      description:
        "Observed on June 5th, World Environment Day is the United Nations' flagship day for promoting environmental awareness and action worldwide. Each year, it focuses on a specific environmental theme, encouraging global participation through various initiatives and campaigns.",
      organizer: "Jane Smith",
      contact_info: "jane.smith@example.com",
      registration_deadline: "2024-02-10", // Date format: YYYY-MM-DD
    },
    {
      id: 3,
      title: "Ocean Cleanup Day",
      date_event: "July 15, 2024",
      location: "Various locations worldwide",
      description:
        "Ocean Cleanup Day is an international event dedicated to removing plastic and other waste from oceans, rivers, and coastlines. Volunteers around the world participate in cleanup activities to help protect marine life and ecosystems.",
      organizer: "Ocean Cleanup Organization",
      contact_info: "info@oceancleanup.org",
      registration_deadline: "2024-06-30", // Date format: YYYY-MM-DD
    },
    {
      id: 4,
      title: "Renewable Energy Conference",
      date_event: "September 20, 2024",
      location: "Virtual",
      description:
        "The Renewable Energy Conference brings together experts, policymakers, and stakeholders to discuss the latest advancements and challenges in renewable energy technologies and sustainability practices. Participants explore opportunities for accelerating the transition to clean and renewable energy sources.",
      organizer: "Renewable Energy Institute",
      contact_info: "contact@renewableenergy.org",
      registration_deadline: "2024-09-15", // Date format: YYYY-MM-DD
    },
  ];
  const [events, setEvents] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/events`)
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => console.log(err));
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["user_events"],
    mutationFn: async (event_id) => {
      return await axios
        .post(`${BASE_URL}/event_user`, {
          user_id: user.id,
          event_id,
        })
        .then((res) => {
          toast.success(res.data.message);
        });
    },
  });

  // // Display a loading indicator or error message if events are not available
  // if (events.length === 0) {
  //   // Use dummy data as a fallback if events are not available
  //   return (
  //     <div className="container mx-auto mt-8">
  //       {/* Large Card */}
  //       {dummyEvents.length > 0 && (
  //         <div className="bg-white rounded-lg shadow-md overflow-hidden lg:flex mb-8">
  //           <div
  //             className="lg:w-1/2 lg:rounded-lg lg:rounded-r-none"
  //             style={{
  //               backgroundImage:
  //                 "url('https://images.pexels.com/photos/8042458/pexels-photo-8042458.jpeg?auto=compress&cs=tinysrgb&w=600')",
  //               backgroundSize: "cover",
  //               height: "400px", // Adjust the height as needed
  //             }}
  //           ></div>
  //           <div className="p-6 lg:w-1/2">
  //             <h2 className="text-2xl font-semibold mb-2">
  //               {dummyEvents[0].title}
  //             </h2>
  //             <p className="text-gray-700 mb-2">
  //               Date: {dummyEvents[0].date_event}
  //             </p>
  //             <p className="text-gray-700 mb-2">
  //               Location: {dummyEvents[0].location}
  //             </p>
  //             <p className="text-gray-700 mb-2">
  //               Organizer: {dummyEvents[0].organizer}
  //             </p>
  //             <p className="text-gray-700 mb-2">
  //               Contact Info: {dummyEvents[0].contact_info}
  //             </p>
  //             <p className="text-gray-700 mb-2">
  //               Registration Deadline: {dummyEvents[0].registration_deadline}
  //             </p>
  //             <p className="text-gray-700 mb-2">
  //               Description: {dummyEvents[0].description}
  //             </p>
  //           </div>
  //         </div>
  //       )}

  //       {/* Smaller Cards */}
  //       <div
  //         className="container mx-auto mt-8"
  //         style={{ paddingBottom: "80px" }}
  //       >
  //         <div className="flex flex-wrap">
  //           {dummyEvents.slice(1).map((event) => (
  //             <div
  //               key={event.id}
  //               className="max-w-sm rounded overflow-hidden shadow-md m-4"
  //             >
  //               <img
  //                 className="w-full"
  //                 src="https://images.pexels.com/photos/9037229/pexels-photo-9037229.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  //                 alt={event.title}
  //               />
  //               <div className="px-6 py-4">
  //                 <div className="font-bold text-xl mb-2">{event.title}</div>
  //                 <p className="text-gray-700 text-base mb-2">
  //                   Date: {event.date_event}
  //                 </p>
  //                 <p className="text-gray-700 text-base mb-2">
  //                   Location: {event.location}
  //                 </p>
  //                 <p className="text-gray-700 text-base mb-2">
  //                   Organizer: {event.organizer}
  //                 </p>
  //                 <p className="text-gray-700 text-base mb-2">
  //                   Contact Info: {event.contact_info}
  //                 </p>
  //                 <p className="text-gray-700 text-base mb-2">
  //                   Registration Deadline: {event.registration_deadline}
  //                 </p>
  //                 <p className="text-gray-700 text-base">
  //                   Description: {event.description}
  //                 </p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto mt-8">
      {/* Large Card */}
      {isLoading ? (
        <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
          <Loader2 className="mr-4 h-8 w-8 animate-spin" />
          Loading events...
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden lg:flex mb-8">
          <div
            className="lg:w-1/2 lg:rounded-lg lg:rounded-r-none"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/8042458/pexels-photo-8042458.jpeg?auto=compress&cs=tinysrgb&w=600')",
              backgroundSize: "cover",
              height: "400px", // Adjust the height as needed
            }}
          ></div>
          <div className="p-6 lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{events[0].title}</h2>
            <p className="text-gray-700 mb-2">Date: {events[0].date_event}</p>
            <p className="text-gray-700 mb-2">Location: {events[0].location}</p>
            <p className="text-gray-700 mb-2">
              Organizer: {events[0].organizer}
            </p>
            <p className="text-gray-700 mb-2">
              Contact Info: {events[0].contact_info}
            </p>
            <p className="text-gray-700 mb-2">
              Registration Deadline: {events[0].registration_deadline}
            </p>
            <p className="text-gray-700 mb-2">
              Description: {events[0].description}
            </p>
            <div className="mt-4">
              {!user ? (
                <Link
                  to={"/login"}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    })
                  )}
                >
                  Login to book event
                </Link>
              ) : (
                <Button
                  disabled={isPending}
                  onClick={() => mutate(events[0].id)}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Book event
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Smaller Cards */}
      <div className="container mx-auto mt-8" style={{ paddingBottom: "80px" }}>
        <div className="flex flex-wrap">
          {events.slice(1).map((event) => (
            <div
              key={event.id}
              className="max-w-sm rounded overflow-hidden shadow-md m-4"
            >
              <img
                className="w-full"
                src="https://images.pexels.com/photos/9037229/pexels-photo-9037229.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{event.title}</div>
                <p className="text-gray-700 text-base mb-2">
                  Date: {event.date_event}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  Location: {event.location}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  Organizer: {event.organizer}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  Contact Info: {event.contact_info}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  Registration Deadline: {event.registration_deadline}
                </p>
                <p className="text-gray-700 text-base">
                  Description: {event.description}
                </p>
                <div className="mt-6">
                  {!user ? (
                    <Link
                      to={"/login"}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        })
                      )}
                    >
                      Login to book event
                    </Link>
                  ) : (
                    <Button
                      disabled={isPending}
                      onClick={() => mutate(event.id)}
                    >
                      {isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Book event
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
