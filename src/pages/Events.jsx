import { Button, buttonVariants } from "@/components/ui/button";
import { BASE_URL, cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useInteractions } from "@/providers/InteractionsProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Ghost, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Events = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  const { setUserEvents } = useInteractions();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if(!user){
      toast.info("Login to see events");
    }
  },[])

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
      setSelectedEvent(event_id);
      return await axios
        .post(`${BASE_URL}/event_user`, {
          user_id: user.id,
          event_id,
        })
        .then((res) => {
          toast.success(res.data.message);
          setUserEvents((prev) => [...prev, res.data.user_event]);
        });
    },
    onSuccess: () => {
      setSelectedEvent(null);
    },
  });

  return (
    <div className="container mx-auto mt-8">
      {/* Large Card */}
      {!user ? (
        <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
          Log in to see events...
        </div>
      ) : isLoading ? (
        <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
          <Loader2 className="mr-4 h-8 w-8 animate-spin" />
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
          <Ghost className="mr-4 h-8 w-8" />
          No events yet...
        </div>
      ) : (
        <div>
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
              <h2 className="text-2xl font-semibold mb-2">
                {events[0]?.title}
              </h2>
              <p className="text-gray-700 mb-2">
                Date: {format(events[0]?.date_event, "PPP")}
              </p>
              <p className="text-gray-700 mb-2">
                Location: {events[0]?.location}
              </p>
              <p className="text-gray-700 mb-2">
                Organizer: {events[0]?.organizer}
              </p>
              <p className="text-gray-700 mb-2">
                Contact Info: {events[0]?.contact_info}
              </p>
              <p className="text-gray-700 mb-2">
                Registration Deadline:{" "}
                {format(events[0]?.registration_deadline, "PPP")}
              </p>
              <p className="text-gray-700 mb-2">
                Description: {events[0]?.description}
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
          {/* Smaller Cards */}
          <div
            className="container mx-auto mt-8"
            style={{ paddingBottom: "80px" }}
          >
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
                    <div className="font-bold text-xl mb-2">{event?.title}</div>
                    <p className="text-gray-700 text-base mb-2">
                      Date: {format(event?.date_event, "PPP")}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      Location: {event?.location}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      Organizer: {event?.organizer}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      Contact Info: {event?.contact_info}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      Registration Deadline:{" "}
                      {format(event?.registration_deadline, "PPP")}
                    </p>
                    <p className="text-gray-700 text-base">
                      Description: {event?.description}
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
                          disabled={isPending && selectedEvent === event.id}
                          onClick={() => mutate(event.id)}
                        >
                          {isPending && selectedEvent === event.id && (
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
      )}
    </div>
  );
};

export default Events;
