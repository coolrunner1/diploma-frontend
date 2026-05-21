import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ru } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLengthErrorMessage = (locale: "en" | "ru", type: "min" | "max", size: number) => {
  if (locale === "en") {
    return `${type == 'min' ? "Minimum" : "Maximum"} length is ${size} symbols`;
  }

  return `Должен содержать ${type == 'min' ? "минимум" : "максимум"} ${size} символов`;
}

/**
 * Converts a string into a deterministic hex color code.
 * @param str - Input string (e.g., "JD", "user123", "my-project")
 * @returns A hex color string like "#a1b2c3" or "#000000" for empty input.
 */
export const stringToHexColor = (str: string): string => {
  if (str.length === 0) {
    return "#000000";
  }

  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash |= 0;
  }

  const colorValue = (hash >>> 0) % 0x1000000;

  const hex = colorValue.toString(16).padStart(6, "0");
  return `#${hex}`;
}

export const ruNominative = {
  ...ru,
  localize: {
    ...ru.localize,
    month: (n: number) => {
      const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];

      return months[n];
    },
  },
};

export const getWeekDaysByLocale = (locale: string) => {
  if (locale === "ru") {
    return [
      "Вс",
      "Пн",
      "Вт",
      "Ср",
      "Чт",
      "Пт",
      "Сб",
    ];
  }

  return [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
}