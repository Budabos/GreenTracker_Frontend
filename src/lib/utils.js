import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:5000`
    : process.env.BASE_URL;
