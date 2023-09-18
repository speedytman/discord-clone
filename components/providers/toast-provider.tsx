"use client";

import { useEffect, useState } from "react";
import { ToastProvider } from "../ui/toast";

const ToasterProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ToastProvider />
    </>
  );
};

export default ToasterProvider;
