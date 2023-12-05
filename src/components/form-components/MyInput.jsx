import React from "react";
import { useField } from "formik";

const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-1">
      <label 
      htmlFor={props.id || props.name}
      className="block text-sm font-medium text-stone-600"
      >{label}</label>
      <input
        {...field}
        {...props}
        id={props.name}
        className={`w-full px-2 sm:w-[260px] rounded-md outline-none ring-2 ring-red-400 focus:ring-2 focus:ring-red-700 ${
          meta.touched && meta.error ? "ring-red-500" : "ring-red-300"
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic mt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyInput;
