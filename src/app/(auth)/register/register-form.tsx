"use client";

import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    console.log("🚀 ~ onSubmit ~ result:", result);

    if (result.status === "success") {
      console.log("User registered successfully");
      toast.success("User registered successfully");
    } else {
      if (Array.isArray(result.error)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result.error.forEach((e: any) => {
          console.log("🚀 ~ result.error.forEach ~ e:", e);
          const fieldName = e.path.join(".") as "email" | "name" | "password";
          setError(fieldName, {
            message: e.message,
          });
        });
      } else {
        setError("root.serverError", {
          message: result.error,
        });
      }
    }
  };

  return (
    <Card className="w-[40%] mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-default">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome to CloudCupid</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Name"
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              defaultValue=""
              label="Password"
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color="danger"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
