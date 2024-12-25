import React, { ReactNode } from "react";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar={true} />
      {children}
    </NextUIProvider>
  );
}
