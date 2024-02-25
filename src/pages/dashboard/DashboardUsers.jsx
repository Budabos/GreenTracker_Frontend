import AddProduct from "@/components/AddProduct";
import ProductCardList from "@/components/ProductCardList";
import UserCardList from "@/components/UserCardList";
import ViewSelector from "@/components/ViewSelector";
import { DataTable } from "@/components/ui/data-table";
import { BASE_URL } from "@/lib/utils";
import { columns } from "@/tables/products/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Ghost, Loader2 } from "lucide-react";
import { useState } from "react";

const DashboardUsers = () => {
  const [active, setActive] = useState("grid");
  const [users, setUsers] = useState([]);
  const [filterBy, setFilterBy] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await axios
        .get(`${BASE_URL}/users`)
        .then((res) => {
          setUsers(res.data);
          return res.data;
        })
        .catch((err) => console.error(err.message));
    },
  });

  if (isLoading || !users) {
    return (
      <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
        <Loader2 className="mr-4 h-8 w-8 animate-spin" />
        Loading users...
      </div>
    );
  } else if (users.length === 0) {
    return (
      <div className="flex w-full items-center justify-center text-xl h-[60dvh]">
        <Ghost className="mr-4 h-12 w-12" />
        No users found...
      </div>
    );
  }

  return (
    <div className="my-8 px-8 flex-1">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Users</h1>
          <div className="flex items-center gap-10">
            {/* <AddProduct setUsers={setUsers} />
            <ViewSelector active={active} setActive={setActive} /> */}
          </div>
        </div>
      </div>
      {active === "grid" && (
        <UserCardList
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          users={users}
          setUsers={setUsers}
        />
      )}
      {/* {active === "list" && <DataTable data={products} columns={columns} />} */}
    </div>
  );
};

export default DashboardUsers;
