import { atom } from "recoil";

export interface CreateBookClubState {
  name: string;
  img: string;
  onoff: boolean;
  max_num: number;
  tag: Array<string>;
  content: string;
  welcome: string;
  question: Array<string>;
}

const initialState: CreateBookClubState = {
  name: "",
  img: "",
  onoff: false,
  max_num: 0,
  tag: [],
  content: "",
  welcome: "",
  question: [],
};

export const recoilCreateBookClubState = atom({
  key: "recoilCreateBookClubState",
  default: initialState,
});
