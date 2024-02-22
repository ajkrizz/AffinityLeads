import React from "react";
import RingLoader from "react-spinners/RingLoader";


function LoadingScreen() {
  return (
    <div className="z-100 flex h-screen w-screen items-center justify-center bg-white">
      <div className="relative flex flex-col items-center justify-center">
      <div className="z-10 text-5xl font-bold text-purple-500 mb-5">
          Affinity Leads AI
        </div>
        <RingLoader color="rgb(112, 13, 145)" speedMultiplier={1} />
      </div>
    </div>
  );
}

export default LoadingScreen;
