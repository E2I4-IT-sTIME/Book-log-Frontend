import { atom } from "recoil";
import defaultclub from "../components/Img/defaultclub.jpg";

export interface CreateBookClubState {
  name: string;
  img: string;
  onoff: boolean;
  max_num: number;
  tag: Array<string>;
  content: string;
  welcome: string;
  question: Array<string>;
  img_file: File;
}

const file = new File(["foo"], "foo.txt");

const initialState: CreateBookClubState = {
  name: "",
  img: "",
  onoff: false,
  max_num: 0,
  tag: [],
  content: "",
  welcome: "",
  question: [],
  img_file: file,
};

export const recoilCreateBookClubState = atom({
  key: "recoilCreateBookClubState",
  default: initialState,
});
