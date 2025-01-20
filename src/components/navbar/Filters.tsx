import { Button, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { Selection } from "@nextui-org/react";

const Filters = () => {
  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleAgeSelect = (value: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("ageRange", value.toString());
    router.replace(`${pathname}?${params}`);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      const params = new URLSearchParams(searchParams);
      params.set("orderBy", String(value.values().next().value ?? "updated"));
      router.replace(`${pathname}?${params}`);
    }
  };

  const selectedGender = searchParams.get("gender")?.split(",") || [
    "male",
    "female",
  ];

  const handleGenderSelect = (selectGender: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedGender.includes(selectGender)) {
      params.set(
        "gender",
        selectedGender.filter((gender) => gender !== selectGender).toString()
      );
    } else {
      params.set("gender", [...selectedGender, selectGender].toString());
    }
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-default font-semibold text-xl">Results: x</div>
        </div>

        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genderList.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="sm"
              isIconOnly
              color="default"
              variant={selectedGender.includes(value) ? "solid" : "light"}
              onPress={() => handleGenderSelect(value)}
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
            defaultValue={[19, 50]}
            aria-label="Age range slider"
            color="secondary"
            onChangeEnd={(values) => handleAgeSelect(values as number[])}
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm">With Photo</p>
          <Switch color="secondary" defaultSelected size="sm" />
        </div>

        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="default"
            aria-label="Order by selector"
            selectedKeys={new Set([searchParams.get("orderBy") || "updated"])}
            onSelectionChange={handleOrderSelect}
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
