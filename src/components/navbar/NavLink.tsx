"use client";

import useMessageStore from "@/hooks/useMessageStore";
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const pathname = usePathname();
  const unreadCount = useMessageStore((state) => state.unreadCount);
  return (
    <NavbarItem
      isActive={pathname === href}
      as={Link}
      href={href}
      className="flex items-center justify-center"
    >
      <span className=" hover:text-secondary">{label}</span>
      {href === "/messages" && unreadCount !== 0 && (
        <span className="ml-1">({unreadCount})</span>
      )}
    </NavbarItem>
  );
}
