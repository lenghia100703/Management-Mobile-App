import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('authentication',{
    state: () => ({
        userInfo: null,
        role: String
    }),
    actions: {
        async loadFromServer() {

        },
        async logout() {
            this.userInfo = null
        }
    }
})