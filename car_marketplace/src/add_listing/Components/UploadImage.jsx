import { Button } from "@/components/ui/button";
import { storage } from "./../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { CarImages } from "./../../../configs/schema";
import { db } from "./../../../configs/Index";

const UploadImage = ({ triggerUploadImages }) => {
  const [selectedFileList, setSelectedFileList] = useState([]);

  useEffect(() => {
    if (triggerUploadImages) {
      uploadImageToServer();
    }
  }, [triggerUploadImages]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image) => {
    const result = selectedFileList.filter((item) => item !== image);
    setSelectedFileList(result);
  };

  const uploadImageToServer = async () => {
    for (const file of selectedFileList) {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "car-marketPlace/" + fileName);
      const metaData = { contentType: "image/jpeg" };

      try {
        await uploadBytes(storageRef, file, metaData);
        console.log("File uploaded");

        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);

        await db.insert(CarImages).values({
          imageUrl: downloadUrl,
          carListingId: triggerUploadImages,
        });
      } catch (err) {
        console.error("Upload error:", err);
      }
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white bg-black rounded-full cursor-pointer"
              onClick={() => onImageRemove(image)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt="car preview"
            />
          </div>
        ))}
        <label htmlFor="upload-image">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple
          id="upload-image"
          onChange={onFileSelected}
          className="opacity-0 absolute"
        />
      </div>
    </div>
  );
};

export default UploadImage;
