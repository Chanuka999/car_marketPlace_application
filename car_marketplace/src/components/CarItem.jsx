import React from "react";
import { Separator } from "./ui/separator";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";

const CarItem = ({ car }) => {
  return (
    <div>
      <img src={car?.image} width={300} height={250} className="rounded-t-xl" />
      <div className="p-4">
        <h2 className="font-bold text-black text-lg mb-2">{car?.name}</h2>
        <Separator />
        <div>
          <div>
            <BsFillFuelPumpDieselFill />
            <h2>{car.miles}Miles</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
