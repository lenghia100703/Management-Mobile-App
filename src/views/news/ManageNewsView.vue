<script setup lang='ts'>

import AddNewsModal from '@/components/modals/news/AddNewsModal.vue'
import { ref } from 'vue'

const addNewsRef = ref<InstanceType<typeof AddNewsModal>>()
</script>

<template>
    <button @click='addNewsRef?.openModal()'>Add News</button>
    <AddNewsModal ref="addNewsRef" />
</template>

<style scoped>

</style>