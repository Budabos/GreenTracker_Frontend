import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL, numberFormat } from "@/lib/utils";
import {
  Check,
  Filter,
  MoreHorizontal,
  PenLine,
  Search,
  Trash,
} from "lucide-react";
import { useState } from "react";
import DeleteItem from "./DeleteItem";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditItem from "./EditItem";
import { format } from "date-fns";
import AddEvent, { eventSchema } from "./AddEvent";

const EventCardList = ({ filterBy, setFilterBy, events, setEvents }) => {
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState("");
  const [pageOffset, setPageOffset] = useState(0);
  const locations = new Set(events.map(({ location }) => location));

  const endOffset = pageOffset + 9;
  const searchedEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderedEvents = searchedEvents
    .filter((event) => {
      if (filterBy.length < 1) return event;

      if (filterBy.includes(event.location)) {
        return event;
      }
    })
    .slice(pageOffset, endOffset);
  const pageCount = Math.ceil(renderedEvents.length / 9);

  const handlePageClick = (pageNum) => {
    const newOffset = (pageNum * 9) % events.length;
    setPageOffset(newOffset);
  };

  const { mutate: deleteEvent, isPending: pendingDeletion } = useMutation({
    mutationKey: ["events"],
    mutationFn: async (id) => {
      return await axios
        .delete(`${BASE_URL}/events/${id}`)
        .then((res) => {
          toast.success("Event deleted successfully");
          const updatedEvents = events.filter((event) => event.id !== id);
          setEvents(updatedEvents);
        })
        .catch((err) => console.log(err.data.message));
    },
  });

  const { mutate: editEvent, isPending: pendingEdit } = useMutation({
    mutationKey: ["events"],
    mutationFn: async ([id, values]) => {
      return await axios
        .patch(`${BASE_URL}/events/${id}`, values)
        .then((res) => {
          toast.success(res.data.message);
          const updatedEvents = events.map((event) => {
            if (event.id === id) {
              return res.data.event;
            }
            return event;
          });
          setEvents(updatedEvents);
        })
        .catch((err) => console.log(err.data.message));
    },
  });

  return (
    <>
      <div className="mt-5 flex items-center justify-between">
        <div className="relative w-[28rem]">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search event..."
          />
          <Search className="h-4 w-4 absolute top-1/2 translate-y-[-50%] right-3" />
        </div>
        <div className="flex items-center gap-6">
          <AddEvent setEvents={setEvents} />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter locations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[...locations].map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => {
                    if (filterBy.includes(location)) {
                      const updatedFilters = filterBy.filter(
                        (filter) => filter !== location
                      );
                      setFilterBy(updatedFilters);
                    } else {
                      setFilterBy((prev) => [...prev, location]);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {filterBy.includes(location) && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-6">
        {renderedEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-center  justify-between gap-4">
                <CardTitle>{event.title}</CardTitle>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DialogTrigger asChild onClick={() => setDialog("edit")}>
                        <DropdownMenuItem>
                          <PenLine className="mr-2 h-4 w-4" />
                          Edit event
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogTrigger
                        onClick={() => setDialog("delete")}
                        asChild
                      >
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete event
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {dialog === "delete" && (
                    <DeleteItem
                      itemType="event"
                      id={event.id}
                      isPending={pendingDeletion}
                      action={deleteEvent}
                    />
                  )}
                  {dialog === "edit" && (
                    <EditItem
                      item={event}
                      action={editEvent}
                      isPending={pendingEdit}
                      schema={eventSchema}
                    />
                  )}
                </Dialog>
              </div>
              <div>
                <Badge variant="outline">{event.location}</Badge>
              </div>
              <CardDescription className="pt-6">
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="opacity-80 text-sm">
              <p>{format(event.date_event, "PPP")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={pageOffset === 0 && "cursor-not-allowed"}
              onClick={() => setPageOffset(pageOffset - 9)}
            />
          </PaginationItem>
          {new Array(pageCount).fill(0).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={index * 9 === pageOffset}
                onClick={() => handlePageClick(index)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                pageOffset === (pageCount - 1) * 9 && "cursor-not-allowed"
              }
              onClick={() => setPageOffset(pageOffset + 9)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default EventCardList;
