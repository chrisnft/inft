import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export interface IForm {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleDrop: React.ChangeEventHandler<HTMLInputElement>;
  //   handleDrop: (files: any) => void;
  vals: {
    name: string;
    description: string;
    file?: File | Blob | string;
    loading: boolean;
    error: string;
    success?: boolean;
  };
}

export type HandleSubmit = IForm["handleSubmit"];

export type HandleChange = IForm["handleChange"];

export type HandleDrop = IForm["handleDrop"];

export type FormVals = IForm["vals"];

export const Form = ({
  handleSubmit,
  handleDrop,
  handleChange,
  vals,
}: IForm) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={vals.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={vals.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="file"
          onChange={handleDrop}
        />
        <button type="submit">Mint</button>
      </form>
    </div>
  );
};

export interface INFTMeta {
  name: string;
  description: string;
  image: string;
  tokenURI: string;
}

export const NFTMetaView = (props: INFTMeta) => {
  return (
    <div>
      <div>{JSON.stringify(props)}</div>
    </div>
  );
};

interface IDropzone {
  handleDrop: HandleDrop;
}

function Dropzone({ handleDrop }: IDropzone) {
  const onDrop = useCallback((files) => {
    handleDrop(files);
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
