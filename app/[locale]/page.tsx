"use client"
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark");
      }
    }, []);

  return (
    <>

    </>
  );
}
