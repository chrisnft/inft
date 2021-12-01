import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { StoreInterface } from "./store";

interface IForm {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  // handleDrop: React.ChangeEventHandler<HTMLInputElement>;
  handleDrop: () => void;
  state: {
    name: string;
    description: string;
    file?: File | Blob | string;
  };
}

export const Form = ({
  handleSubmit,
  handleDrop,
  handleChange,
  state,
}: IForm) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <Dropzone handleDrop={handleDrop} />
        <button type="submit">Mint</button>
      </form>
    </div>
  );
};

interface IDropzone {
  handleDrop: () => void;
}

function Dropzone({ handleDrop }: IDropzone) {
  const onDrop = useCallback((files) => {
    handleDrop();
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          Drag 'n' drop some files here, or click
          to select files
        </p>
      )}
    </div>
  );
}

export const Button = ({
  state,
  setState,
}: {
  setState: StoreInterface["setState"];
  state: StoreInterface["state"];
}) => {
  return (
    <>
      <button
        onClick={() =>
          setState({ ...state, name: "chris" })
        }
      >
        Set name
      </button>
      <div>{JSON.stringify(state)}</div>
    </>
  );
};
