import React from "react";

const AuthField = ({ textArea, label, type, name, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {textArea ? (
        <textarea
          id={name}
          name={name}
          className={`w-full rounded-lg resize-none h-[80px] border text-sm border-gray-200 text-gray-800 px-4 py-2`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={`w-full rounded-lg border text-sm border-gray-200 text-gray-800 px-4 py-2`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default AuthField;
