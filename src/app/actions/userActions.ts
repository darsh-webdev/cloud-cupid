"use server";

import {
  MemberEditType,
  memberEditSchema,
} from "@/lib/schemas/MemberEditSchema";
import { ActionResult } from "@/types";
import { Member } from "@prisma/client/wasm";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";

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
