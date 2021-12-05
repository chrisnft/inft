import * as React from "react";

interface AccountProps {}

export const Account = (
  props: AccountProps
): JSX.Element => {
  return <div>Account</div>;
};

interface FormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Form = (
  props: FormProps
): JSX.Element => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={props.handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        onChange={props.handleChange}
      />
      <input
        type="file"
        name="image"
        placeholder="image"
        onChange={props.handleChange}
      />
      <button type="submit">Mint</button>
    </form>
  );
};

export const ImagePreview = () => {};

interface NetworkProps {}
export const Network = (
  props: NetworkProps
): JSX.Element => {
  return <div>Network</div>;
};
