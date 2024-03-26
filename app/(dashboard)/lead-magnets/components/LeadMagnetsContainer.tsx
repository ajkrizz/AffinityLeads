"use client";

import { Button } from "@/components/ui/button";
import {Lead,LeadMagnet} from "@prisma/client";

import React from 'react';
import LeadMagnetTable from "./LeadMagnetTable";
import Link from "next/link";

interface LeadMagnetsContainerProps {
    leadMagnets: LeadMagnet[];
    leads: Lead[];
  }

  function LeadMagnetsContainer({
    leadMagnets,
    leads,
  }: LeadMagnetsContainerProps) {
    console.log("LeadMagnets from inside the clients",leadMagnets);
    console.log("leads from inside the clients",leads)
  return (
  <div className="p-6 w-full lg:max-w-5xl lg:mx-auto">
    <div className="flex justify-between items-center mb-3">
        <h2 className="mb-4 w-fit bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">Lead Magnets</h2>
        <Button variant="default">
        <Link href="/lead-magnet-editor"> Create </Link>
        </Button>
    </div>

    <LeadMagnetTable leadMagnets={leadMagnets} leads={leads} />
  </div>
  );
}

export default LeadMagnetsContainer