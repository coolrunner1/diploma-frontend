"use client"
import Image from "next/image";

export default function Home() {
  return (
    <>
      <button
          className={"p-3 rounded-xl bg-red-200 dark:bg-gray-800 dark:text-white"}
          onClick={() => document.body.classList.toggle('dark')}
      >
        gay
      </button>
    </>
  );
}
