"use client"
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark");
        }
    }, [])
  return (
    <>
      <button
          className={"p-3 rounded-xl bg-red-200 dark:bg-gray-800 dark:text-white"}
          onClick={() => document.body.classList.toggle('dark')}
      >
        Toggle theme
      </button>
    </>
  );
}
