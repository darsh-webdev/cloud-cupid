import { usePathname, useRouter } from "next/navigation";
import useFilterStore from "./useFilterStore";
import { Selection } from "@nextui-org/react";
import { ChangeEvent, useEffect } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import usePaginationStore from "./usePaginationStore";

export const useFilters = () => {
  const pathname = usePathname();
  const router = useRouter();

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const pageNumber = usePaginationStore((state) => state.pagination.pageNumber);
  const pageSize = usePaginationStore((state) => state.pagination.pageSize);
  const setPage = usePaginationStore((state) => state.setPage);
  const totalCount = usePaginationStore((state) => state.pagination.totalCount);

  const { gender, ageRange, orderBy, withPhoto } = filters;

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, withPhoto, setPage]);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (gender) searchParams.set("gender", gender.join(","));
    if (ageRange) searchParams.set("ageRange", ageRange.toString());
    if (orderBy) searchParams.set("orderBy", orderBy);
    if (withPhoto) searchParams.set("withPhoto", withPhoto.toString());
    if (pageSize) searchParams.set("pageSize", pageSize.toString());
    if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());

    router.replace(`${pathname}?${searchParams}`);
  }, [
    ageRange,
    orderBy,
    gender,
    withPhoto,
    router,
    pathname,
    pageNumber,
    pageSize,
  ]);

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const handleAgeSelect = (value: number[]) => {
    setFilters("ageRange", value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters("orderBy", value.values().next().value);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value)) {
      setFilters(
        "gender",
        gender.filter((genderValue) => genderValue !== value)
      );
    } else {
      setFilters("gender", [...gender, value]);
    }
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters("withPhoto", e.target.checked);
  };

  return {
    orderByList,
    genderList,
    selectAge: handleAgeSelect,
    selectOrder: handleOrderSelect,
    selectGender: handleGenderSelect,
    selectWithPhoto: handleWithPhotoToggle,
    filters,
    totalCount,
  };
};
