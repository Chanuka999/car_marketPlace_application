import React from "react";
import Search from "./Search";

const Hero = () => {
  return (
    <div className="flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-[#eef0fc]">
      <h2 className="text-lg">Find cars for sale and for rent</h2>
      <h2 className="text-[60px] font-bold">Find your dream car</h2>

      <Search />
      <img src="./tesla.png" className="mt-10" />
    </div>
  );
};

export default Hero;
