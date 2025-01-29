"use client";
import { generateResetPasswordEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { ActionResult } from "@/types";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

const ForgotPasswordForm = () => {
  const [result, setResult] = useState<ActionResult<string> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setResult(await generateResetPasswordEmail(data.email));
    reset();
  };

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText="Forgot Password"
      subHeaderText="Enter account email to reset your password"
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Input
            type="email"
            placeholder="Enter email address"
            variant="bordered"
            defaultValue=""
            {...register("email", { required: true })}
          />
          <Button
            type="submit"
            color="secondary"
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Send reset email
          </Button>
        </form>
      }
      footer={<ResultMessage result={result} />}
    />
  );
};

export default ForgotPasswordForm;
