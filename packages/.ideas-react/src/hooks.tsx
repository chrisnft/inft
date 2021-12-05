import * as React from "react";
import * as store from "./store";

export interface FormState {
  name: string;
  description: string;
  image: File;
}

export type FormEventHandler =
  React.FormEventHandler;

export type ChangeEventHandler =
  React.ChangeEventHandler<HTMLInputElement>;

/**
 * Handles form input and submission.
 * @remarks
 * Hooks perform side effects in components
 * @return The form handlers and state
 */
export const useForm = (
  state: store.AppState,
  setState: React.Dispatch<store.AppState>
) => {
  /**
   *
   * @param event HTMLFormElement values
   */
  const handleSubmit: FormEventHandler = (
    event
  ) => {
    event.preventDefault();
  };

  /**
   *
   * @param event HTMLInputElement values
   */
  const handleChange: ChangeEventHandler = (
    event
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.type === "file") {
      _handleFileOnChange(event);
    }
    setFormState({
      ...formState,
      ...{ form: { [name]: value } },
    });
  };

  const _handleFileOnChange: ChangeEventHandler =
    (event) => {
      if (
        event.target.files &&
        event.target.files.length > 1
      ) {
        const file = event.target.files[0];

        const imgprev = URL.createObjectURL(file);

        console.log(imgprev);

        setFormState({
          ...formState,
          ...{ image: file },
        });
      }

      console.log(formState);
    };

  return {
    handleChange,
    handleSubmit,
  };
};

const _readFile = (blob: Blob) => {
  const fr = new FileReader();
  fr.onloadend = (v) => console.log(v);
  fr.readAsArrayBuffer(blob);
};
