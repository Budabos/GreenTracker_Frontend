import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_KEY = "tQwZxNs9meZ43GhGJvQ6UA";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = import.meta.env.DEV ? `http://localhost:5555` : "";

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "Ksh",
  }).format(value);
