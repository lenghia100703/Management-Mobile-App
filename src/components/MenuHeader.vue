<script setup lang='ts'>

import { PATHS } from '@/router/paths.ts'
</script>

<template>
    <el-menu-item class='desktop-logo-container no-hover' :route='PATHS.HOME' index='1'>
        <img src='@/assets/images/logo.png' class='desktop-logo' alt='logo-app' />
    </el-menu-item>
    <el-menu-item
        :route='PATHS.HOME'
        :index='PATHS.HOME'
    >
        <FAIcon icon='fa-solid fa-house' />
        Trang chủ
    </el-menu-item>
    <el-sub-menu index='2'>
        <template #title>Quản lý tài khoản</template>
        <el-menu-item :index='PATHS.ADMIN_MANAGE_USER' :route='PATHS.ADMIN_MANAGE_USER'>
            Danh sách tài khoản
        </el-menu-item>
        <el-menu-item :index='PATHS.ADMIN_ADD_USER' :route='PATHS.ADMIN_ADD_USER'>
            Thêm tài khoản mới
        </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index='3'>
        <template #title>Quản lý tin tức - sự kiện</template>
        <el-menu-item :index='PATHS.ADMIN_MANAGE_NEWS' :route='PATHS.ADMIN_MANAGE_NEWS'>
            Danh sách tin tức - sự kiện
        </el-menu-item>
        <el-menu-item :index='PATHS.ADMIN_ADD_NEWS' :route='PATHS.ADMIN_ADD_NEWS'>
            Thêm tin tức - sự kiện
        </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index='4'>
        <template #title>Quản lý hiện vật</template>
        <el-menu-item :index='PATHS.ADMIN_MANAGE_EXHIBITION' :route='PATHS.ADMIN_MANAGE_EXHIBITION'>
            Danh sách hiện vật
        </el-menu-item>
        <el-menu-item :index='PATHS.ADMIN_ADD_EXHIBITION' :route='PATHS.ADMIN_ADD_EXHIBITION'>
            Thêm hiện vật
        </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index='5'>
        <template #title>Quản lý câu hỏi</template>
        <el-menu-item :index='PATHS.ADMIN_MANAGE_QUESTION' :route='PATHS.ADMIN_MANAGE_QUESTION'>
            Danh sách câu hỏi
        </el-menu-item>
        <el-menu-item :index='PATHS.ADMIN_ADD_QUESTION' :route='PATHS.ADMIN_ADD_QUESTION'>
            Thêm câu hỏi
        </el-menu-item>
    </el-sub-menu>
</template>

<style scoped>

</style>