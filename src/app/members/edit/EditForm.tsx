"use client";
import React, { useEffect } from "react";
import { Member } from "@prisma/client/wasm";
import {
  memberEditSchema,
  MemberEditType,
} from "@/lib/schemas/MemberEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { updateMemberProfile } from "@/app/actions/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  member: Member;
};

const EditForm = ({ member }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditType>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  const router = useRouter();

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditType) => {
    const nameUpdated = data.name !== member.name;
    const result = await updateMemberProfile(data, nameUpdated);

    if (result.status === "success") {
      toast.success("Profile updated successfully");
      router.refresh();
      reset({ ...data });
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((error: any) => {
          const fieldName = error.path.join(".");
          setError(fieldName, { message: error.message });
        });
      } else {
        setError("root.serverError", { message: result.error });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        label="Name"
        variant="bordered"
        {...register("name")}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        label="Description"
        variant="bordered"
        {...register("description")}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className="flex flex-row gap-3">
        <Input
          label="City"
          variant="bordered"
          {...register("city")}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="Country"
          variant="bordered"
          {...register("country")}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="secondary"
      >
        Update profile
      </Button>
    </form>
  );
};

export default EditForm;
