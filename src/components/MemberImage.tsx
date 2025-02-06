"use client";

import { Photo } from "@prisma/client/wasm";
import { CldImage } from "next-cloudinary";
import React from "react";
import { Button, Image } from "@nextui-org/react";
import clsx from "clsx";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";

type Props = {
  photo: Photo | null;
};

export default function MemberImage({ photo }: Props) {
  const role = useRole();
  const isAdmin = role === "ADMIN";
  const router = useRouter();

  if (!photo) return null;

  const handleApprove = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {photo?.publicId ? (
        <div className="flex flex-col justify-center items-center">
          <CldImage
            alt="Image of member"
            src={photo.publicId}
            width={300}
            height={300}
            crop="fill"
            gravity="faces"
            className={clsx("rounded-2xl", {
              "opacity-40": !isAdmin && !photo.isApproved,
            })}
            priority
          />
        </div>
      ) : (
        <Image src={photo?.url || "/images/user.png"} alt="Image of user" />
      )}
      {photo && !photo.isApproved && !isAdmin && (
        <div className="absolute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold text-sm">
            Awaiting Approval
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="flex flex-row gap-2 mt-2">
          <Button
            color="success"
            variant="bordered"
            fullWidth
            onPress={() => handleApprove(photo.id)}
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            color="danger"
            variant="bordered"
            fullWidth
            onPress={() => handleReject(photo)}
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
