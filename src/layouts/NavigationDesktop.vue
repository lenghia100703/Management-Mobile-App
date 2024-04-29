<script setup lang='ts'>

import { PATHS } from '@/router/paths'
import FAIcon from '@/components/common/FAIcon.vue'
import { ref } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'

const isCollapse = ref(true)

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const handleCollapse = () => {
    isCollapse.value = !isCollapse.value
}

</script>

<template>
    <div class='desktop-navigation-container'>
        <el-menu class='menu-bars'>
            <el-menu-item>
                <FAIcon size='25px' icon='fa-solid fa-bars' @click='handleCollapse' />
            </el-menu-item>

        </el-menu>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            router
        >
            <MenuHeader />
        </el-menu>
    </div>
</template>

<style scoped>

</style>