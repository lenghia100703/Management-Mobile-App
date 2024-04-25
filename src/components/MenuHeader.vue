<script setup lang='ts'>

import { PATHS } from '@/router/paths'
</script>

<template>
    <el-menu-item class='desktop-logo-container no-hover' :route='PATHS.HOME' index='1'>
        <img src='@/assets/images/logo.png' class='desktop-logo' alt='logo-app' />
    </el-menu-item>
    <el-menu-item :route='PATHS.HOME' :index='PATHS.HOME'>
        Trang chủ
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_USER' :route='PATHS.ADMIN_MANAGE_USER'>
        Quản lý người dùng
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_NEWS' :route='PATHS.ADMIN_MANAGE_NEWS'>
        Quản lý tin tức - sự kiện
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_EXHIBITION' :route='PATHS.ADMIN_MANAGE_EXHIBITION'>
        Quản lý hiện vật
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_QUESTION' :route='PATHS.ADMIN_MANAGE_QUESTION'>
        Quản lý câu hỏi
    </el-menu-item>
</template>

<style scoped>
.desktop-logo {
    width: auto;
    height: 65px;
}
</style>