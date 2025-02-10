import { getUnapprovedPhotos } from "@/app/actions/adminActions";
import MemberPhotos from "@/components/MemberPhotos";
import { Divider } from "@nextui-org/react";
import React from "react";

export const dynamic = "force-dynamic";

const PhotoModerationPage = async () => {
  const { photos, members } = await getUnapprovedPhotos();
  return (
    <div className="flex flex-col mt-10 gap-3">
      <h3 className="text-2xl text-secondary font-semibold">
        Photos awaiting approval
      </h3>
      <Divider />
      <MemberPhotos photos={photos} members={members} />
    </div>
  );
};

export default PhotoModerationPage;
