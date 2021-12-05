import React from "react";

export const Spinner = () => {
  return (
    <div
      style={_spinnerStyle}
      className="w-6 h-6 border-4 border-blue-400 border-solid rounded-full animate-spin"
    />
  );
};

const _spinnerStyle: React.CSSProperties = {
  borderTopColor: "transparent",
};
