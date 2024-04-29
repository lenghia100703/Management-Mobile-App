<script setup lang='ts'>

import { PATHS } from '@/router/paths'
</script>

<template>
    <el-menu-item :route='PATHS.HOME' :index='PATHS.HOME'>
        <template #title>Trang chủ</template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_USER' :route='PATHS.ADMIN_MANAGE_USER'>
        <template #title>Quản lý người dùng</template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_NEWS' :route='PATHS.ADMIN_MANAGE_NEWS'>
        <template #title>Quản lý tin tức - sự kiện</template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_EXHIBITION' :route='PATHS.ADMIN_MANAGE_EXHIBITION'>
        <template #title>Quản lý hiện vật</template>
    </el-menu-item>
    <el-menu-item :index='PATHS.ADMIN_MANAGE_QUESTION' :route='PATHS.ADMIN_MANAGE_QUESTION'>
        <template #title>Quản lý câu hỏi</template>
    </el-menu-item>
</template>

<style scoped>

</style>