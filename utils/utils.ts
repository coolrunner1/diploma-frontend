import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLengthErrorMessage = (locale: "en" | "ru", type: "min" | "max", size: number) => {
  if (locale === "en") {
    return `${type == 'min' ? "Minimum" : "Maximum"} length is ${size} symbols`;
  }

  return `Должен содержать ${type == 'min' ? "минимум" : "максимум"} ${size} символов`;
}