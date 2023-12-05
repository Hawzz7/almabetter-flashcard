import React from 'react'
import { useField } from "formik";

const TermInput = ({ label, ...props }) => {
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
        className={`w-full px-2 rounded-md outline-none ring-2 ring-red-400 focus:ring-2 focus:ring-red-700 ${
          meta.touched && meta.error ? "ring-red-500" : "ring-red-300"
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="mt-2 text-xs italic text-red-500">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default TermInput;