import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCartItem = (item) => {
    const foundItem = cart.find(({ id }) => item.id === id);

    if (foundItem) {
      addCartItemQuantity(foundItem.id);
      toast.success(`Updated ${foundItem.name} quantity`);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
      toast.success(`${item.name} added to cart`);
    }
  };

  console.log(cart);

  const addCartItemQuantity = (id) => {
    const updatedCartItems = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCartItems);
  };

  const reduceCartItem = (id) => {
    const updatedCartItems = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    setCart(updatedCartItems);
  };

  const removeItem = (id) => {
    const updatedCartItems = cart.filter((item) => item.id !== id);

    setCart(updatedCartItems);
  };

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
      addCartItemQuantity,
      reduceCartItem,
      removeItem,
      totalPrice,
      totalQuantity,
      addCartItem,
    }),
    [
      cart,
      setCart,
      addCartItemQuantity,
      reduceCartItem,
      removeItem,
      totalPrice,
      totalQuantity,
      addCartItem,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
