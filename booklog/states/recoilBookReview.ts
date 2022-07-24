import { atom } from "recoil";

export const isEditState = atom<boolean>({
    key: "isReviewEdit",
    default: false,
})

export const isMakeState = atom<boolean>({
    key: "isReviewMake",
    default: false,
})

