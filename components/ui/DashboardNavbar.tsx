"use client"
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const routes = [
  {
    name: "Lead Magnets",
    path: "/lead-magnets",
  },
  {
    name: "About",
    path:  "/about",
  },
  {
    name: "Account",
    path: "/account",
  },
];

function DashboardNavBar() {
  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <div className="p-3 flex justify-between items-center text-purple-500 border-b">
      {/* Logo Link */}
      <Link href="/">
        <h1 className="mb-4 w-fit bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">Affinity Leads AI</h1>
      </Link>
      {/*  Routes followed by the clerk user button */}
      <div className="flex gap-x-6 text-lg items-center">
        {routes.map((route, idx) => (
          <Link
            key={idx}
            href={route.path}
            className={
              pathname === route.path ? "border-b-2 border-purple-300" : ""
            }
          >
            {route.name}
          </Link>
        ))}

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default DashboardNavBar;
