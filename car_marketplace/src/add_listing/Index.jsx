import Header from "@/components/Header";
import React, { useState } from "react";
import carDetails from "./../components/Shared/carDetails.json";
import InputFeild from "./Components/InputFeild";
import DropDownFeild from "./Components/DropDownFeild";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-select";
import { Checkbox } from "@/components/ui/checkbox";
import features from "./../components/Shared/features.json";
import { Button } from "@/components/ui/button";

import { db } from "../../configs/Index.js";
import { CarListing } from "./../../configs/schema";
import TextAreaFeild from "./Components/TextAreaFeild";
//import { log } from "console";

const AddListing = () => {
  const [formData, setFormData] = useState([]);
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const result = await db.insert(CarListing).values(formData);
      if (result) {
        console.log("Data Saved");
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
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
                    <InputFeild
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropDownFeild
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaFeild
                      item={item}
                      handleInputChange={handleInputChange}
                    />
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
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleInputChange(item.name, value)
                    }
                  />{" "}
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Button type="submit" onClick={(e) => onSubmit(e)}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
