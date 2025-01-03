"use client";

import { signOutUser } from "@/app/actions/authActions";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {
  userInfo: {
    name: string | null;
    image: string | null;
  } | null;
};

export default function UserMenu({ userInfo }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="default"
          name={userInfo?.name || "user avatar"}
          size="sm"
          src={userInfo?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
            key={Math.random() + "abc"}
          >
            Signed in as {userInfo?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          as={Link}
          href="/members/edit"
          key={Math.random() + "abc"}
        >
          Edit profile
        </DropdownItem>
        <DropdownItem
          key={Math.random() + "abc"}
          color="danger"
          onPress={async () => signOutUser()}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
