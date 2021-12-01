import * as React from "react";

interface Actions {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  // handleDrop: React.ChangeEventHandler<HTMLInputElement>;
  handleDrop: () => void;
}

export const handleSubmit: Actions["handleSubmit"] =
  (e) => {
    e.preventDefault();
    console.log("Submit");
    console.log(e);
  };

export const handleDrop: Actions["handleDrop"] =
  () => {
    console.log("drop");
  };

export const handleChange: Actions["handleChange"] =
  (e) => {};
