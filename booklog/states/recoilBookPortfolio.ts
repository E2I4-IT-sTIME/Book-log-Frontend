import exp from "constants";
import { atom } from "recoil";

// export interface BookPortfolio {
//     isEdit : boolean;
//     isMake : boolean;
// }

// const initialState: BookPortfolio = {
//     isEdit:false,
//     isMake:false
// }

export const isEditState = atom<boolean>({
    key: "isEdit",
    default: false,
})

export const isMakeState = atom<boolean>({
    key: "isMake",
    default: false,
})

