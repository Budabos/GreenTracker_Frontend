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
import { BASE_URL, capitalizeWord, numberFormat } from "@/lib/utils";
import {
  Check,
  Filter,
  Loader2,
  MoreHorizontal,
  PenLine,
  Search,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";

const UserCardList = ({ users, setUsers, filterBy, setFilterBy }) => {
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState("");
  const [pageOffset, setPageOffset] = useState(0);

  const endOffset = pageOffset + 9;
  const searchedUsers = users.filter((user) => {
    const fullName = user.first_name + user.last_name;
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  const renderedUsers = searchedUsers
    .filter((user) => {
      if (filterBy.length < 1) return user;

      if (filterBy.includes(user.gender)) {
        return user;
      }
    })
    .slice(pageOffset, endOffset);
  const pageCount = Math.ceil(renderedUsers.length / 9);

  const handlePageClick = (pageNum) => {
    const newOffset = (pageNum * 9) % users.length;
    setPageOffset(newOffset);
  };

  const { mutate: suspendAccount, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (id) => {
      return await axios
        .patch(`${BASE_URL}/users/${id}`, {
          account_status: "suspended",
        })
        .then((res) => {
          toast.success(res.data.message);
          const updatedUsers = users.map((user) => {
            if (user.id === id) {
              return res.data.user;
            }

            return user;
          });
          setUsers(updatedUsers);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

    const { mutate: unSuspendAccount, isPending: unSuspendPending } = useMutation({
      mutationKey: ["user"],
      mutationFn: async (id) => {
        return await axios
          .patch(`${BASE_URL}/users/${id}`, {
            account_status: "active",
          })
          .then((res) => {
            toast.success(res.data.message);
            const updatedUsers = users.map((user) => {
              if (user.id === id) {
                return res.data.user;
              }

              return user;
            });
            setUsers(updatedUsers);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      },
    });

  return (
    <>
      <div className="mt-5 flex items-center justify-between">
        <div className="relative w-[28rem]">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user..."
          />
          <Search className="h-4 w-4 absolute top-1/2 translate-y-[-50%] right-3" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Male", "Female"].map((gender) => (
              <DropdownMenuItem
                onClick={() => {
                  if (filterBy.includes(gender)) {
                    const updatedFilters = filterBy.filter(
                      (filter) => filter !== gender
                    );
                    setFilterBy(updatedFilters);
                  } else {
                    setFilterBy((prev) => [...prev, gender]);
                  }
                }}
                className="cursor-pointer"
              >
                {filterBy.includes(gender) && (
                  <Check className="mr-2 h-4 w-4" />
                )}
                {gender}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-6">
        {renderedUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center  justify-between gap-4">
                <CardTitle>
                  {user.first_name} {user.last_name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="*:cursor-pointer">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={
                        user.account_status !== "suspended" && "text-red-600"
                      }
                      onClick={() => {
                        if(user.account_status === 'suspended'){
                          unSuspendAccount(user.id);
                        }else{
                          suspendAccount(user.id);
                        }
                      }}
                    >
                      {isPending || unSuspendPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <PenLine className="mr-2 h-4 w-4" />
                      )}
                      {user.account_status === "suspended"
                        ? "Activate account"
                        : "Suspend account"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{capitalizeWord(user.role)}</Badge>
                <Badge
                  variant={
                    user.account_status === "suspended"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {capitalizeWord(user.account_status)}
                </Badge>
              </div>
              <CardDescription className="pt-6">
                {capitalizeWord(user.gender)}
              </CardDescription>
            </CardHeader>
            <CardContent className="opacity-80 text-sm">
              <ul className="space-y-2">
                <li>Phone number: {user.phone}</li>
                <li>Number of reviews {user.reviews.length}</li>
                <li>Number of bookings {user.events.length}</li>
              </ul>
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

export default UserCardList;
