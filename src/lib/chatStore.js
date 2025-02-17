import { create } from 'zustand'
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatID: null,
    user: null,
    isCurrentUserBlocked: null,
    isRecieverBlocked: null,
    changeChat: (chatId, user)=>{
        const currentUser = useUserStore.getState().currentUser

        if(user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isRecieverBlocked: false,
            });
        }

        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isRecieverBlocked:true,
            });
        } else{
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isRecieverBlocked: false,
            });
        pdea}

    },

        changeBlock: () => {
            set((state) => ({ ...state, isRecieverBlocked: !state.isRecieverBlocked}));
        },
}));
