import { Button, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import React from "react";
import { useFilters } from "@/hooks/useFilters";

const Filters = () => {
  const {
    orderByList,
    genderList,
    selectAge,
    selectGender,
    selectOrder,
    selectWithPhoto,
    filters,
    totalCount,
  } = useFilters();

  const { ageRange, gender, orderBy } = filters;
  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-default font-semibold text-xl">
            Results: {totalCount}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genderList.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="sm"
              isIconOnly
              color="default"
              variant={gender.includes(value) ? "solid" : "light"}
              onPress={() => selectGender(value)}
            >
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
            defaultValue={ageRange}
            aria-label="Age range slider"
            color="secondary"
            onChangeEnd={(values) => selectAge(values as number[])}
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm">With Photo</p>
          <Switch
            color="secondary"
            defaultSelected
            size="sm"
            onChange={(checked) => selectWithPhoto(checked)}
          />
        </div>

        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="default"
            aria-label="Order by selector"
            selectedKeys={new Set([orderBy])}
            onSelectionChange={selectOrder}
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
