<script setup lang='ts'>
import { ref } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'

const isLoggedIn = ref(true)
</script>

<template>
    <div class='header-content'>
        <template v-if='isLoggedIn'>
            <el-menu class='menu' mode='horizontal' :ellipsis='false' background-color='#011b33' menu-trigger='click'
                     :default-active='$route.path' router>
                <MenuHeader />

                <div class='flex-grow'></div>
                <el-menu-item class='no-hover' index='10'>
                    <span class='name-user'>
                        <el-avatar src='' />
                        <span class='avatar'>avatar</span>
                    </span>
                </el-menu-item>
            </el-menu>
        </template>

        <template v-else>
            <el-menu class='menu' mode='horizontal' :ellipsis='false' background-color='#fff' menu-trigger='click'
                     :default-active='$route.path' router>
                // content
            </el-menu>
        </template>
    </div>
</template>

<style scoped>
.menu {
    color: white;
}
</style>