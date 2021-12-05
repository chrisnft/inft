import React from "react";

// Button for the event OnClick
export const Button = ({
  // @ts-ignore
  text,
  onClick = undefined,
  disabled = false,
  styles = "",
  ...props
}) => {
  return (
    <>
      <button
        type="button"
        className={
          "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " +
          styles
        }
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {text}
      </button>
    </>
  );
};

export const ButtonOpenInNewTab = ({
  // @ts-expect-error
  text,
  // @ts-expect-error
  URL,
  styles = "",
}) => {
  return (
    <>
      <Button
        text={text}
        styles={styles}
        // @ts-ignore
        onClick={() =>
          window
            ? window.open(URL, "_blank")
            : undefined
        }
      />
    </>
  );
};
