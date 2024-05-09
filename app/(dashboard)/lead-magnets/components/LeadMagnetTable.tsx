import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Lead, LeadMagnet } from '@prisma/client';
import Link from 'next/link';

import React from 'react';

interface LeadMagnetTableProps {
    leadMagnets: LeadMagnet[];
    leads: Lead[];
}

function LeadMagnetTable({leadMagnets  ,leads}:LeadMagnetTableProps) {
    const getLeadsForLeadMagnet = (leadMagnetId: string): number => {
        const leadsForLeadMagnet = leads.filter(
          (lead) => lead.leadMagnetId === leadMagnetId
        );
    
        return leadsForLeadMagnet.length;
      };


      const getConversionRate = (
        leadMagnetId: string,
        pageViews: number
      ): number => {
        if (pageViews === 0) return 0;
    
        const conversionRate = Math.round(
          (getLeadsForLeadMagnet(leadMagnetId) / pageViews) * 100
        );
    
        return conversionRate;
      };

    return (
        <Table className="table table-hover table-striped">
          <TableHeader >
            <TableRow className="bg-purple-200">
              <TableHead className="text-lg">Name</TableHead>
              <TableHead className="text-lg">Page Visits</TableHead>
              <TableHead className="text-lg">Leads</TableHead>
              <TableHead className="text-lg">Conversion Rate</TableHead>
              <TableHead className="text-lg">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
        {leadMagnets.map((leadMagnet) => (
          <TableRow key={leadMagnet.id} className="hover:bg-gray-100">
            <TableCell className="bg-purple-50 p-5">
              <Link
                className="text-lg"
                href={`/lead-magnet-editor/${leadMagnet.id}`}
              >
                {leadMagnet.name}
              </Link>
            </TableCell>
            <TableCell className="bg-purple-50 p-5">{leadMagnet.pageViews}</TableCell>
            <TableCell className="bg-purple-50 p-5">{getLeadsForLeadMagnet(leadMagnet.id)}</TableCell>
            <TableCell className="bg-purple-50 p-5">
              {getConversionRate(leadMagnet.id, leadMagnet.pageViews)} %
            </TableCell>
            <TableCell className="bg-purple-50 p-5">
              <Link href={`/leads/${leadMagnet.id}`}>
                <Button className="font-normal" variant="link">
                  View Leads
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
        </Table>
      );
    }

export default LeadMagnetTable;