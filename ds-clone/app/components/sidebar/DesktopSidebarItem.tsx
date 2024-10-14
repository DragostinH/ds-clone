"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface DesktopSidebarItemProps {
  label: string;
  href: string;
  icon?: string;
  active: boolean;
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
}) => {
  return (
    <Link
      href={href}
      className={clsx("border-2", "rounded-md", {
        "bg-primary-100": active,
      })}
    >
      {label}
    </Link>
  );
};

export default DesktopSidebarItem;
