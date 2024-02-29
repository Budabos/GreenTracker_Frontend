import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/utils";

const InteractionsContext = createContext();

const InteractionsProvider = ({ children }) => {
  const { getUser } = useAuth();
  const user = getUser();
  const [userEvents, setUserEvents] = useState(user?.events || []);
  const [userOrders, setUserOrders] = useState(user?.orders || []);

  const { data: eventsData } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/events`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/products`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

  const events = userEvents?.map((userEvent) => {
    if (Array.isArray(eventsData)) {
      return eventsData?.find((event) => event.id === userEvent.event_id);
    } else {
      return [];
    }
  });

  const orderDetails = userOrders?.map(
    ({ total_price, order_products, id }) => {
      if (Array.isArray(productsData)) {
        const productIds = order_products?.map(({ product_id }) => product_id);
        const products = productsData
          ?.filter((product) => productIds?.includes(product.id))
          ?.map((product) => ({
            quantity: order_products?.find(
              (item) => item?.product_id === product?.id
            ).quantity,
            product: product,
          }));
        return {
          total_price,
          products,
          id,
        };
      } else {
        return [];
      }
    }
  );

  console.log(userOrders);

  const contextValue = useMemo(
    () => ({
      events,
      setUserEvents,
      orderDetails,
      setUserOrders,
    }),
    [events, setUserEvents, orderDetails, setUserOrders]
  );

  return (
    <InteractionsContext.Provider value={contextValue}>
      {children}
    </InteractionsContext.Provider>
  );
};

export const useInteractions = () => {
  return useContext(InteractionsContext);
};

export default InteractionsProvider;
