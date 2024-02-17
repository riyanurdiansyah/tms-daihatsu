"use client";
import { useEffect, useState } from "react";

export default function useDimensiLayar() {
  const [dimensiLayar, setDimensiLayar] = useState(dapatkanDimensiLayar());

  useEffect(() => {
    function handelResize() {
      setDimensiLayar(dapatkanDimensiLayar());
    }
    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  }, []);

  const [dimensi, setDimensi] = useState([0, 0]);
  useEffect(() => {
    setDimensi(dimensiLayar);
  }, [dimensiLayar]);

  return dimensi;
}

function dapatkanDimensiLayar() {
  let lebarLayar = 0;
  let tinggiLayar = 0;
  if (typeof window !== "undefined") {
    const { innerWidth, innerHeight } = window;
    lebarLayar = innerWidth;
    tinggiLayar = innerHeight;
  }
  return [lebarLayar, tinggiLayar];
}
