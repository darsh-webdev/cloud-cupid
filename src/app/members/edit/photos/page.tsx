import React from "react";
import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import MemberPhotos from "@/components/MemberPhotos";
import MemberPhotoUpload from "./MemberPhotoUpload";

const PhotosPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-secondary">
          Edit Profile
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member.image}
        />
      </CardBody>
    </>
  );
};

export default PhotosPage;
