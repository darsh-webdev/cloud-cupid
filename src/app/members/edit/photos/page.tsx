import React from "react";
import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import MemberPhotos from "@/components/MemberPhotos";
import MemberPhotoUpload from "./MemberPhotoUpload";
import CardInnerWrapper from "@/components/CardInnerWrapper";

const PhotosPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardInnerWrapper
        header="Edit Profile"
        body={
          <>
            <MemberPhotoUpload />
            <MemberPhotos
              photos={photos}
              editing={true}
              mainImageUrl={member.image}
            />
          </>
        }
      />
    </>
  );
};

export default PhotosPage;
