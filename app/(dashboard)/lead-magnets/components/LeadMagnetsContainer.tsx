"use client";

import { Button } from "@/components/ui/button";
import {Lead,LeadMagnet} from "@prisma/client";
import { Link } from "lucide-react";
import React from 'react';

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
        <h2 className="text-xl font-semibold">Lead Magnets</h2>
        <Button variant="default">
            <Link href="/lead-magnet-editor">Create</Link>
        </Button>
    </div>
  </div>
  );
}

export default LeadMagnetsContainer