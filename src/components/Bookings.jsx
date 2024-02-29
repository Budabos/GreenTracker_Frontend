import { BASE_URL } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInteractions } from "@/providers/InteractionsProvider";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

const Bookings = () => {
  const { events } = useInteractions();
  return (
    <div className="mb-14 mt-8">
      <div className="gap-10 grid grid-cols-2">
        {events.map((event) => {
          if (event) {
            return (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
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
            );
          }
        })}
      </div>
    </div>
  );
};

export default Bookings;
