"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import SocialLogin from "./social-login";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    console.log("🚀 ~ onSubmit ~ result:", result);
    if (result.status === "success") {
      router.push("/members");
      toast.success("Logged in successfully");
      router.refresh();
    } else {
      console.log("🚀 ~ onSubmit ~ result.error:", result.error);
      toast.error(result.error as string);
    }
  };

  return (
    <Card className="w-[40%] mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-default">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} className="text-secondary-500" />
            <h1 className="text-3xl font-semibold text-secondary-500">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back to CloudCupid!</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
            <Button
              fullWidth
              color="secondary"
              type="submit"
              isDisabled={!isValid}
            >
              Login
            </Button>
            <SocialLogin />
            <div className="flex justify-center hover:underline text-sm">
              <Link href="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
