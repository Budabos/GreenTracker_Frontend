import AddEvent from "@/components/AddEvent";
import AddProduct from "@/components/AddProduct";
import EventCardList from "@/components/EventCardList";
import ProductCardList from "@/components/ProductCardList";
import ViewSelector from "@/components/ViewSelector";
import { DataTable } from "@/components/ui/data-table";
import { BASE_URL } from "@/lib/utils";
import { columns } from "@/tables/products/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Ghost, Loader2 } from "lucide-react";
import { useState } from "react";

const DashboardEvents = () => {
  const [active, setActive] = useState("grid");
  const [filterBy, setFilterBy] = useState([]);
  const [events, setEvents] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/events`)
        .then((res) => {
          setEvents(res.data);
          return res.data;
        })
        .catch((err) => console.error(err.message));
    },
  });

  if (isLoading || !events) {
    return (
      <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Loading events...
      </div>
    );
  } else if (events.length === 0) {
    return (
      <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
        <Ghost className="mr-4 h-12 w-12" />
        No events found...
      </div>
    );
  }

  return (
    <div className="my-8 px-8 flex-1">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Events</h1>
          <div className="flex items-center gap-10">
            <AddEvent setEvents={setEvents} />
            <ViewSelector active={active} setActive={setActive} />
          </div>
        </div>
      </div>
      {active === "grid" && (
        <EventCardList
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          events={events}
          setEvents={setEvents}
        />
      )}
      {/* {active === "list" && <DataTable data={products} columns={columns} />} */}
    </div>
  );
};

export default DashboardEvents;
