<script setup lang='ts'>

import { onMounted, ref } from 'vue'
import { getCurrentUser } from '@/services/user.ts'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore.ts'

// const user = ref(null)
const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
onMounted(async () => {

})
</script>

<template>
    home page
</template>

<style scoped>

</style>