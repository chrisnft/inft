import React from "react";
import { Spinner } from "./spinner";
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
    prevImgURL?: string;
    error: unknown;
  };
}

export const MintForm = ({
  handleSubmit,
  handleDrop,
  handleChange,
  vals,
}: IForm) => {
  return (
    <div className="main bg-gray-100 p-2 rounded-md shadow">
      <div className="flex mb-4 items-baseline font-mono">
        <span>Mint</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 divide-y divide-gray-200 border-gray-500"
      >
        <Input
          type="text"
          name="name"
          value={vals.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="description"
          value={vals.description}
          onChange={handleChange}
        />
        <FileInput
          prevImgURL={vals.prevImgURL}
          type="file"
          name="file"
          onChange={handleDrop}
        />
        <Button
          type="submit"
          isLoading={vals.loading}
        />
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

const Input = ({
  name,
  label = name,
  ...props
}: {
  name: string;
  label?: string;
  onChange: any;
  type: string;
  value?: any;
}) => (
  <div className="sm:col-span-3">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700"
    >
      {capitalize(label)}
    </label>
    <div className="mt-1">
      <input
        id={name}
        name={name}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        {...props}
      />
    </div>
  </div>
);

const PreviewImg = ({
  src = "",
  alt = "",
  width = 100,
  height = 100,
  className = "",
  refnode = null,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={
        "h-30 " + src == null
          ? "invisible"
          : "visible"
      }
      ref={refnode}
      {...props}
    />
  );
};

const Button = ({
  type,
  isLoading,
}: {
  type: "button" | "reset" | "submit" | undefined;
  isLoading?: boolean;
}) => {
  return (
    <button
      type={type}
      className="border-solid border bg-gray-200 flex items-center gap-2 h-15 bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border-blue-500 hover:border-transparent rounded"
    >
      <>
        {isLoading && <Spinner />}
        <span>Submit</span>
      </>
    </button>
  );
};

const ImgSVG = () => (
  <svg
    className="mx-auto h-12 w-12 text-gray-400"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileInput = ({
  name,
  label = name,
  prevImgURL,
  ...props
}: {
  name: string;
  label?: string;
  onChange: any;
  type: string;
  prevImgURL?: string;
}) => {
  return (
    <div className="sm:col-span-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        Image
      </label>

      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {/* imgsvg */}
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              {/* User click for file */}
              <ImgSVG />
              {/* <span>{capitalize(label)}</span> */}
            </label>
          </div>
          <Input
            name={name}
            // @ts-ignore
            className="sr-only"
            {...props}
          />
          {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
          {prevImgURL && (
            <PreviewImg src={prevImgURL} />
          )}
        </div>
      </div>
    </div>
  );
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
