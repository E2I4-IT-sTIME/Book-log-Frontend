import { atom } from "recoil";

export const userIndexState = atom<number>({
    key: "userIndex",
    default: 6,
})