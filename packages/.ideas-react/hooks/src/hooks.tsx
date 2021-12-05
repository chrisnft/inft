import * as React from "react";

export const useForm = () => {
  // Set state mutates state and renders
  const [state, setState] = React.useState(1);

  // Runs if contents change after every render
  React.useEffect(() => {
    console.log("useEffect");
  }, [state]);

  return { state, setState };
};
