import { Input } from "@/components/ui/input";
import React from "react";

const InputFeild = ({ item }) => {
  return (
    <div>
      <Input
        type={item?.feildType}
        name={item?.name}
        required={item?.required}
      />
    </div>
  );
};

export default InputFeild;
