import React from "react";
import { Separator } from "./ui/separator";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";

const CarItem = ({ car }) => {
  return (
    <div className="rounded-lg bg-white border shadow-md cursor-pointer w-full max-w-sm mx-auto sm:max-w-full">
      <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-xs sm:text-sm text-white">
        New
      </h2>
      <img
        src={car?.image}
        className="rounded-t-lg w-full h-48 object-cover sm:h-64"
        alt={car?.name}
      />
      <div className="p-3 sm:p-4">
        <h2 className="font-semibold text-black text-base sm:text-sm mb-2">
          {car?.name}
        </h2>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs sm:text-sm">
          <div className="flex flex-col items-center sm:items-center">
            <BsFillFuelPumpDieselFill className="text-lg mb-1" />
            <h2 className="text-center">{car.miles} Miles</h2>
          </div>
          <div className="flex flex-col items-center sm:items-center">
            <MdSpeed className="text-lg mb-1" />
            <h2 className="text-center">{car.fuelType}</h2>
          </div>
          <div className="flex flex-col items-center sm:items-center">
            <GiGearStickPattern className="text-lg mb-1" />
            <h2 className="text-center">{car.gearType}</h2>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="font-bold text-lg sm:text-sm sm:text-xl">
            ${car.price}
          </h2>
          <h2 className="text-primary text-xs sm:text-sm flex gap-1 items-center">
            view details
            <MdOpenInNew />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
