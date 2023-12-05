import React, { useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import UploadIcon from "@mui/icons-material/Upload";

const UploadImage = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props.name);
  const fileRef = useRef(null);


  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setFieldValue(props.name, reader.result);
      };
    }
    console.log(file);
  };

  return (
    <div className="space-y-2">
      {field.value && typeof field.value === "string" && (
        <div className="flex items-center justify-center">
          <img
            src={field.value}
            alt="Uploaded"
            className="mt-2 rounded-lg"
            style={{ maxWidth: "120px" }}
          />
        </div>
      )}
      <label className="hidden" htmlFor={props.name}>
        {label}
      </label>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="flex items-center justify-center h-[30px] w-[110px] px-3 py-2 text-[10px] text-white duration-[250ms] bg-blue-500 hover:bg-blue-700 ring-2 hover:ring-red-600 ring-red-400 rounded focus:outline-none focus:shadow-outline hover:scale-105"
          onClick={handleClick}
        >
          <UploadIcon className="mr-1" /> Upload Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          id={props.name}
          name={props.name}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {meta.touched && meta.error && (
        <div className="text-sm italic text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default UploadImage;
