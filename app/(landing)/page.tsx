import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

function Landingpage() {
  return (
    <div className="flex flex-col items-center">
      <main>
        <Hero/>
       
      </main>
    </div>
  )
}

export default Landingpage;

const Hero = () => {
  return (
    <div className="mx-4 mb-14 mt-6 flex flex-1 flex-col items-center text-center sm:mb-12 md:mb-32 md:mt-20">
      <h1 className="max-w-5xl text-2xl font-bold sm:text-4xl md:text-6xl">
        Convert Content Into Customers With{" "}
        <span className="bg-gradient-to-r from-purple-400 to-orange-600 bg-clip-text text-transparent">
         {" "}Affinity Leads AI{" "}
        </span>
      </h1>

      <p className="sm:text-md mt-5 max-w-2xl text-sm text-gray-600  md:text-xl">
        Affinity Leads AI helps creaters turn regular content into interactive AI
        experiences, effortlessly capturing leads, and nurturing them towards
        your digital products or courses.
      </p>
      <div className="mt-3 flex max-w-4xl flex-col flex-wrap items-center justify-around sm:w-full sm:flex-row">
        <Link href="/lead-magnets">
          <Button variant="default" className="md:text-xl">
            Create Your First AI Lead Magnet
          </Button>
        </Link>
      </div>
    </div>
  );
};