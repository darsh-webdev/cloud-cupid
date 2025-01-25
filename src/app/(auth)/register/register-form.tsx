"use client";

import { registerUser } from "@/app/actions/authActions";
import {
  profileSchema,
  RegisterSchema,
  registerSchema,
} from "@/lib/schemas/RegisterSchema";
import { handleFormServerErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";
import UserDetailsForm from "./user-details-form";
import ProfileDetailsForm from "./profile-details-form";
import { useRouter } from "next/navigation";

const stepSchemas = [registerSchema, profileSchema];

export default function RegisterForm() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStepSchema = stepSchemas[activeStep];

  const router = useRouter();

  const registerFormMethods = useForm<RegisterSchema>({
    resolver: zodResolver(currentStepSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = registerFormMethods;

  const onSubmit = async () => {
    console.log(getValues());
    const result = await registerUser(getValues());
    if (result.status === "success") {
      toast.success("User registered successfully!");
      router.push("/register/success");
    } else {
      toast.error("User registration failed");
      handleFormServerErrors(result, setError);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;

      case 1:
        return <ProfileDetailsForm />;

      default:
        return "Unknown step";
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Card className="w-[40%] mx-auto mt-[200px]">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-default">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} className="text-secondary-500" />
            <h1 className="text-3xl font-semibold text-secondary-500">
              Register
            </h1>
          </div>
          <p className="text-neutral-500">Welcome to CloudCupid</p>
        </div>
      </CardHeader>
      <CardBody>
        <FormProvider {...registerFormMethods}>
          <form onSubmit={handleSubmit(onNext)}>
            <div className="space-y-4">
              {getStepContent(activeStep)}
              {errors.root?.serverError && (
                <p className="text-danger text-sm">
                  {errors.root.serverError.message}
                </p>
              )}
              <div className="flex flex-row items-center gap-6">
                {activeStep !== 0 && (
                  <Button onPress={onBack} fullWidth>
                    Back
                  </Button>
                )}
                <Button
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  fullWidth
                  color="secondary"
                  type="submit"
                >
                  {activeStep === stepSchemas.length - 1
                    ? "Submit"
                    : "Continue"}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}
