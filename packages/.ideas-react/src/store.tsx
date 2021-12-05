export interface AppStore {
  name: string;
  description: string;
  image: File;
  imgPrev?: string;
}

/**
 * Default state for user's form.
 */
export const defAppStore: AppStore = {
  name: "",
  description: "",
  image: new File([], ""),
  imgPrev: "",
};
