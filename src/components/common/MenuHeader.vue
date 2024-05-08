<script setup lang='ts'>

import { PATHS } from '@/router/paths'
import FAIcon from '@/components/common/FAIcon.vue'
</script>

<template>
    <el-menu-item :route='PATHS.HOME' :index='PATHS.HOME'>
        <template #title>
            <FAIcon icon='fa-solid fa-home' class='icon' />
            Trang chủ
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_USER' :route='PATHS.ADMIN_MANAGE_USER'>
        <template #title>
            <FAIcon icon='fa-solid fa-user' class='icon' />
            Quản lý người dùng
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_NEWS' :route='PATHS.ADMIN_MANAGE_NEWS'>
        <template #title>
            <FAIcon icon='fa-solid fa-newspaper' class='icon' />
            Quản lý tin tức - sự kiện
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_EXHIBITION' :route='PATHS.ADMIN_MANAGE_EXHIBITION'>
        <template #title>
            <FAIcon icon='fa-solid fa-image' class='icon' />
            Quản lý hiện vật
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_BANNER' :route='PATHS.ADMIN_MANAGE_BANNER'>
        <template #title>
            <FAIcon icon='fa-solid fa-panorama' class='icon' />
            Quản lý ảnh bìa
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_QUESTION' :route='PATHS.ADMIN_MANAGE_QUESTION'>
        <template #title>
            <FAIcon icon='fa-solid fa-question' class='icon' />
            Quản lý câu hỏi
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_TICKET' :route='PATHS.ADMIN_MANAGE_TICKET'>
        <template #title>
            <FAIcon icon='fa-solid fa-ticket' class='icon' />
            Quản lý vé
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_TRANSACTION' :route='PATHS.ADMIN_MANAGE_TRANSACTION'>
        <template #title>
            <FAIcon icon='fa-solid fa-money-check-dollar' class='icon' />
            Quản lý giao dịch
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_POST' :route='PATHS.ADMIN_MANAGE_POST'>
        <template #title>
            <FAIcon icon='fa-solid fa-pen-to-square' class='icon' />
            Quản lý bài viết
        </template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_LOCATION' :route='PATHS.ADMIN_MANAGE_LOCATION'>
        <template #title>
            <FAIcon icon='fa-solid fa-location-dot' class='icon' />
            Quản lý địa điểm
        </template>
    </el-menu-item>
</template>

<style scoped>
.icon {
    margin-right: 8px;
}
</style>