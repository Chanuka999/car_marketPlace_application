import { Input } from "@/components/ui/input";
import React from "react";

const InputFeild = ({ item, handleInputChange }) => {
  return (
    <div>
      <Input
        type={item?.feildType}
        name={item?.name}
        required={item?.required}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
      />
    </div>
  );
};

export default InputFeild;
