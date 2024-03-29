import { useAuth } from "@/providers/AuthProvider";
import {
  Ghost,
  Loader2,
  LogOut,
  Minus,
  MoveRight,
  Plus,
  ShoppingCart,
  User,
  UserCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../greentrackrlogo.png";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCart } from "@/providers/CartProvider";
import { Item } from "@radix-ui/react-dropdown-menu";
import { usePaystackPayment } from "react-paystack";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useInteractions } from "@/providers/InteractionsProvider";

const Navbar = () => {
  const { userCred, logout, getUser } = useAuth();
  const user = getUser();
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const initalizePayment = usePaystackPayment();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [display, setDisplay] = useState(true);
  const { setUserOrders } = useInteractions();

  useEffect(() => {
    const excludes = ["/login", "/signup", "/forgot-password", "/reset"];
    if (
      excludes.some((excludePath) => pathname.startsWith(excludePath)) ||
      user?.role === "admin"
    ) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [pathname, user]);

  const {
    cart,
    addCartItemQuantity,
    reduceCartItem,
    removeItem,
    totalPrice,
    totalQuantity,
    setCart,
  } = useCart();

  const { mutate: makeOrder, isPending } = useMutation({
    mutationKey: ["orders"],
    mutationFn: async (values) => {
      return await axios
        .post(`${BASE_URL}/orders`, values)
        .then((res) => {
          toast.success(res.data.message);
          setUserOrders(res.data.updated_user.orders);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
    onSuccess: () => {
      setCart([]);
    },
  });

  const product_ids = cart.map((item) => item.id).join(",");
  const quantities = cart.map((item) => item.quantity).join(",");

  return display ? (
    <div className="flex items-center justify-between py-4 px-6 bg-[#245501] text-white font-bold">
      <Link to="/">
        <img
          src={logo}
          alt="GreenTrackr Logo"
          className="w-16 h-16 mr-2"
          style={{ height: "12vh", width: "12vh" }}
        />
      </Link>
      {/* <Logo /> */}
      <NavLinks />
      {userCred ? (
        <div className="flex items-center gap-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="relative">
              <ShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute bottom-[-0.5rem] right-[-0.5rem] h-4 w-4 flex justify-center bg-white text-black rounded px-2 text-xs">
                  {totalQuantity}
                </span>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-3xl">Cart</DialogTitle>
                {cart.length > 0 ? (
                  <DialogDescription className="pt-8 flex flex-col items-start gap-6">
                    {cart.map(({ id, quantity, name, image_url, price }) => (
                      <div
                        key={id}
                        className="w-full flex items-start justify-between"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={image_url}
                            alt={name}
                            className="w-h-20 h-20 rounded"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-primary">
                              {name}
                            </span>
                            <span>x{quantity}</span>
                            <span>Ksh. {price * quantity}</span>
                            <Button
                              onClick={() => removeItem(id)}
                              variant="link"
                              className="justify-start pl-0"
                            >
                              Remove item
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-r-none"
                            onClick={() => reduceCartItem(id)}
                            disabled={quantity === 1}
                          >
                            <Minus />
                          </Button>
                          <p className="h-10 w-10 border border-y flex items-center justify-center">
                            {quantity}
                          </p>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-l-none"
                            onClick={() => addCartItemQuantity(id)}
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="w-full flex items-center justify-between">
                      <p className="text-xl font-semibold text-primary">
                        Total price: Ksh. {totalPrice}
                      </p>
                      <Button
                        disabled={isPending}
                        onClick={() => {
                          setOpen(false);
                          initalizePayment({
                            config: {
                              reference: new Date().getTime().toString(),
                              email: user?.email,
                              amount: totalPrice * 100,
                              currency: "KES",
                              publicKey,
                            },
                            onSuccess: () => {
                              makeOrder({
                                user_id: user.id,
                                product_ids,
                                quantities,
                                total_price: totalPrice,
                              });
                            },
                          });
                        }}
                      >
                        {isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Proceed to checkout
                      </Button>
                    </div>
                  </DialogDescription>
                ) : (
                  <div className="p-10 flex items-center justify-center text-lg font-semibold">
                    <Ghost className="h-10 w-10 mr-3" />
                    No products in cart...
                  </div>
                )}
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.image_url} />
                <AvatarFallback className="text-black">
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link className="flex items-center" to={"/profile"}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link to={"/signup"}>
              <MoveRight className="mr-2 h-4 w-4" /> Get started{" "}
            </Link>
          </Button>
          <Button variant={"ghost"}>
            <Link to={"/login"}>Login</Link>
          </Button>
        </div>
      )}
    </div>
  ) : null;
};

export default Navbar;
