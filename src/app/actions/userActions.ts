"use server";

import {
  MemberEditType,
  memberEditSchema,
} from "@/lib/schemas/MemberEditSchema";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client/wasm";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";

export async function updateMemberProfile(
  formData: MemberEditType,
  nameUpdated: boolean
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserId();

    const { data, success, error } = memberEditSchema.safeParse(formData);

    if (!success || error) {
      return { status: "error", error: error.errors };
    }

    const { name, description, city, country } = data;

    if (nameUpdated) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });

    return { status: "success", data: member };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return {
      status: "error",
      error: "Something went wrong while updating user profile",
    };
  }
}

export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();

    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [
            {
              url,
              publicId,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log("🚀 ~ addImage ~ error:", error);
    throw error;
  }
}

export async function setMainImage(photo: Photo) {
  try {
    if (!photo.isApproved)
      throw new Error(
        "Only approved photos are allowed to be set as profile image"
      );
    const userId = await getAuthUserId();

    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });

    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log("🚀 ~ setMainImage ~ error:", error);
    throw error;
  }
}

export async function deleteImage(photo: Photo) {
  try {
    const userId = await getAuthUserId();

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (error) {
    console.log("🚀 ~ deleteImage ~ error:", error);
    throw error;
  }
}

export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserId();
    console.log("🚀 ~ getUserInfoForNav ~ userId:", userId);
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        image: true,
      },
    });
  } catch (error) {
    console.log("🚀 ~ getUserInfoForNav ~ error:", error);
    throw error;
  }
}
