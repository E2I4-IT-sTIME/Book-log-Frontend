import { atom } from "recoil";

export const isEditState = atom<boolean>({
    key: "isReviewEdit",
    default: false,
})

export const isMakeState = atom<boolean>({
    key: "isReviewMake",
    default: false,
})

export const isTotalState = atom<boolean>({
    key: "isTotal",
    default: false,
})

export const isAddState = atom<boolean>({
    key: "isAdd",
    default: false,
})

export const profTitleState = atom<string>({
    key: "profTitle",
    default: "도르마무",
})


