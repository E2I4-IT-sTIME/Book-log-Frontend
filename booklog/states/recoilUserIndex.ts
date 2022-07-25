import { atom } from "recoil";

export const userIndexState = atom<String>({
    key: "userIndex",
    default: "0",
})