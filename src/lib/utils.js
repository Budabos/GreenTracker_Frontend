import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// export const API_KEY = "tQwZxNs9meZ43GhGJvQ6UA";

export const API_KEY = "SMWB0P4sDjqKPPghPANKg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = import.meta.env.DEV
  ? `http://localhost:5555`
  : import.meta.env.BACKEND_URL;

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "Ksh",
  }).format(value);

export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
