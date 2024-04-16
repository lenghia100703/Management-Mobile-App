<script setup lang='ts'>

import { PATHS } from '@/router/paths.ts'
import FAIcon from '@/components/common/FAIcon.vue'
</script>

<template>
    <div class='desktop-navigation-container'>
        <el-menu
            :default-active='$route.path'
            class='desktop-navigation-menu'
            router
        >
            <el-menu-item class='desktop-logo-container no-hover' :route='PATHS.HOME' :index='PATHS.HOME'>
                <img src='@/assets/images/logo.png' class='desktop-logo' alt='logo-app' />
            </el-menu-item>
            <el-menu-item
                :route='PATHS.HOME'
                :index='PATHS.HOME'
            >
                <FAIcon icon='fa-solid fa-house' />
                Trang chủ
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style scoped>

</style>