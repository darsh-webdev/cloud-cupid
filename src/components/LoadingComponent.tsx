import { Spinner } from "@nextui-org/react";
import React from "react";

export default function LoadingComponent({ label }: { label: string }) {
  return (
    <div className="flex justify-center items-center fixed inset-0">
      <Spinner label={label || "Loading..."} color="default" />
    </div>
  );
}
