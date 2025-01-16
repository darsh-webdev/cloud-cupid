import { Button, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";

const Filters = () => {
  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-default font-semibold text-xl">Results: x</div>
        </div>

        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genderList.map(({ icon: Icon, value }) => (
            <Button key={value} size="sm" isIconOnly color="default">
              <Icon size={24} />
            </Button>
          ))}
        </div>

        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            label="Age range"
            size="sm"
            minValue={18}
            maxValue={99}
            defaultValue={18}
            aria-label="Age range slider"
            color="foreground"
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm">With Photo</p>
          <Switch color="default" defaultSelected size="sm" />
        </div>

        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="default"
            aria-label="Order by selector"
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
