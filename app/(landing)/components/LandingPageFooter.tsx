import React from "react";


function LandingPageFooter() {
  return (
   
    <><div className="border-t border-gray-200 bg-white px-5 py-4 text-center">
      <span className="text-gray-600">Contact: </span>
      <span className="font-bold text-purple-500">
        <a
          href="mailto:ajayak.mca2224@saintgits.org"
          className="text-purple-500 hover:underline"
        >
          affinityleadsai@gmail.com
        </a>
      </span>
    </div><div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Affinity leads AI™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="http://localhost:3000/about" className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
          <a
          href="mailto:ajayak.mca2224@saintgits.org"
          className="text-purple-500 hover:underline"
        >
          Contact
        </a>
          </li>
        </ul>
      </div></>
    
  );
}

export default LandingPageFooter;
