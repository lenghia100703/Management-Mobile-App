<script setup lang='ts'>

import { onMounted } from 'vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { loadingFullScreen } from '@/utils/loadingFullScreen'

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
onMounted(() => {
    loadingFullScreen()
})
</script>

<template>
    home page
</template>

<style scoped>

</style>