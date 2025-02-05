import { getUnapprovedPhotos } from "@/app/actions/adminActions";
import MemberPhotos from "@/components/MemberPhotos";
import { Divider } from "@nextui-org/react";
import React from "react";

const PhotoModerationPage = async () => {
  const photos = await getUnapprovedPhotos();
  return (
    <div className="flex flex-col mt-10 gap-3">
      <h3 className="text-2xl text-secondary font-semibold">
        Photos awaiting approval
      </h3>
      <Divider />
      <MemberPhotos photos={photos} />
    </div>
  );
};

export default PhotoModerationPage;
