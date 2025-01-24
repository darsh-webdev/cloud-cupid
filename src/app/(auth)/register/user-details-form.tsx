"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

const UserDetailsForm = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <Input
        defaultValue={getValues("name")}
        label="Name"
        variant="bordered"
        {...register("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
      <Input
        defaultValue=""
        label="Email"
        variant="bordered"
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        defaultValue=""
        label="Password"
        variant="bordered"
        type="password"
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
    </div>
  );
};

export default UserDetailsForm;
