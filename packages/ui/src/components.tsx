import React, { useCallback } from "react";
import { ethers } from "ethers";

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

export interface NetworkInfo {
  network: string;
  name: string;
  ether: number;
}

export const Network = (props: NetworkInfo) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.ether}</div>
    </div>
  );
};
