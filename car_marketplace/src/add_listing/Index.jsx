import React, { useState } from "react";
import Header from "@/components/Header";
import carDetails from "./../components/Shared/carDetails.json";
import features from "./../components/Shared/features.json";
import { BiLoaderAlt } from "react-icons/bi";

import InputFeild from "./Components/InputFeild";
import DropDownFeild from "./Components/DropDownFeild";
import TextAreaFeild from "./Components/TextAreaFeild";
import IconFeild from "./Components/IconFeild";
import UploadImage from "./Components/UploadImage";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@radix-ui/react-select";

import { db } from "../../configs/Index.js";
import { CarListing } from "../../configs/schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

const AddListing = () => {
  const [formData, setFormData] = useState({});
  const [featureData, setFeatureData] = useState({});
  const [triggerUploadImages, setTriggerUploadImages] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    setFeatureData((prev) => ({
      ...prev,
      [name]: !!value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!user) {
      toast.error("User not authenticated");
      setLoader(false);
      return;
    }

    toast("Please wait...");

    try {
      const result = await db
        .insert(CarListing)
        .values({
          ...formData,
          features: featureData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          postedOn: moment().format("DD/MM/YYYY"),
        })
        .returning({ id: CarListing.id });

      if (result && result[0]?.id) {
        console.log("Data saved:", result);
        setTriggerUploadImages(result[0].id);
        setSuccessMsg("Listing created successfully! Uploading images...");
      } else {
        toast.error("Failed to create listing");
      }
    } catch (e) {
      console.error("Error saving listing:", e);
      toast.error("Error saving listing");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>

        {successMsg && (
          <div className="bg-green-100 text-green-800 p-4 rounded mt-4">
            {successMsg}
          </div>
        )}

        <form onSubmit={onSubmit} className="p-10 border rounded-xl mt-10">
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconFeild icon={item?.icon} />
                    {item?.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputFeild
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <DropDownFeild
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "textarea" ? (
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
                      handleFeatureChange(item.name, value)
                    }
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <UploadImage
            triggerUploadImages={triggerUploadImages}
            setLoader={(v) => {
              setLoader(v);
              if (!v) {
                navigate("/profile");
              }
            }}
          />

          <div className="mt-10 flex justify-end">
            <Button type="submit" disabled={loader}>
              {loader ? (
                <BiLoaderAlt className="animate-spin text-lg" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
