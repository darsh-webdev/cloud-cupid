import React from "react";
import { Pagination } from "@nextui-org/react";
import clsx from "clsx";

const PaginationComponent = () => {
  const resultText = `Showing 1-2 of 24 results`;
  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div>{resultText}</div>
        <Pagination total={24} color="secondary" page={1} variant="bordered" />
        <div className="flex flex-row gap-1 items-center">
          Page size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              className={clsx("page-size-box", {
                "bg-secondary text-white hover:bg-secondary/90 hover:text-white":
                  size === 3,
              })}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
