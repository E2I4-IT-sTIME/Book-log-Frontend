import { atom } from "recoil";

export const isEditState = atom<boolean>({
    key: "isEdit",
    default: false,
})

export const isMakeState = atom<boolean>({
    key: "isMake",
    default: false,
})

