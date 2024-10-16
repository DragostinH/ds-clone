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
			className={clsx(
				"border-2",
				"rounded-full",
				"h-12",
				"w-12",
				"items-center",
				"flex",
				"justify-center",
				"cursor-pointer",
				"transition-all",
				"duration-600",
				"ease-in-out",
				"hover:transform",
				"hover:scale-90",
				"hover:rotate-[6deg]",
				"hover:bg-opacity-50",
				"hover:shadow-md",
				{
					"bg-primary-100": active,
				}
			)}></Link>
	);
};

export default DesktopSidebarItem;
