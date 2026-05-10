import { create } from 'zustand'
import {NewPopupMessage, PopupMessage} from "@/types/popup";
import { v4 as uuidv4 } from 'uuid';

type Store = {
    messageQueue: PopupMessage[]
    pushMessage: (message: NewPopupMessage) => void
    popMessage: () => void
}

export const useStore = create<Store>()((set) => ({
    messageQueue: [],
    pushMessage: (message: NewPopupMessage) => set((state) => (
        {
            messageQueue: [{uuid: uuidv4(), ...message}, ...state.messageQueue]
        }
    ),),
    popMessage: () => set((state) => {
        state.messageQueue.pop();
        return ({
            messageQueue: state.messageQueue
        })
    })
}))