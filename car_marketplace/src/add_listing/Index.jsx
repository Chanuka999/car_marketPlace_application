import Header from "@/components/Header";
import React from "react";
import carDetails from "./../components/Shared/carDetails.json";
import InputFeild from "./Components/InputFeild";
import DropDownFeild from "./Components/DropDownFeild";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-select";
import { Checkbox } from "@/components/ui/checkbox";
import features from "./../components/Shared/features.json";

const AddListing = () => {
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm">
                    {item?.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputFeild item={item} />
                  ) : item.fieldType == "dropdown" ? (
                    <DropDownFeild item={item} />
                  ) : item.fieldType == "textarea" ? (
                    <Textarea item={item} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox /> <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
