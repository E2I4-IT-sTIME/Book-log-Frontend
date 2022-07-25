import { atom } from "recoil";

export const recoilLoginedState = atom<boolean>({
  key: "isLogined",
  default: false,
});
