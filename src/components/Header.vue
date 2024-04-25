<script setup lang='ts'>
import MenuHeader from '@/components/MenuHeader.vue'
import { PATHS } from '@/router/paths.ts'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore.ts'
import { ref } from 'vue'
import AvatarDrawers from '@/components/drawers/AvatarDrawers.vue'

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
const infoRef = ref<InstanceType<typeof AvatarDrawers> | null>(null);

const handleOpenDrawer = () => {
    infoRef.value?.openDrawer();
}
</script>

<template>
    <div class='header-content'>
        <template v-if='authenticationStore.authenticated'>
            <el-menu class='menu' mode='horizontal' :ellipsis='false' background-color='#fff' menu-trigger='click'
                     :default-active='$route.path' router>
                <MenuHeader />

                <div class='flex-grow'></div>
                <el-menu-item class='no-hover'>
                    <span class='name-user' @click="handleOpenDrawer">
                        <el-avatar :src='authenticationStore?.userInfo?.avatar' />
                        <span class='avatar'>{{ authenticationStore?.userInfo?.username }}</span>
                    </span>
                </el-menu-item>
            </el-menu>
        </template>

        <template v-else>
            <el-menu class='menu' mode='horizontal' :ellipsis='false' background-color='#fff' menu-trigger='click'
                     :default-active='$route.path' router>
                <MenuHeader />
                <div class='flex-grow'></div>
                <el-menu-item
                    class='no-hover'
                    :route='PATHS.REGISTER'
                    :index='PATHS.REGISTER'
                >
                    <el-button plain>Đăng ký</el-button>
                </el-menu-item>

                <el-menu-item
                    class='no-hover'
                    :route='PATHS.LOGIN'
                    :index='PATHS.LOGIN'
                >
                    <el-button type='primary'>Đăng nhập</el-button>
                </el-menu-item>
            </el-menu>
        </template>
    </div>

    <AvatarDrawers ref='infoRef' />
</template>

<style scoped>
.menu {
    color: white;
}

.flex-grow {
    flex-grow: 1;
}

.menu .no-hover:hover {
    background-color: transparent !important;
}

.name-user {
    display: flex;
    align-items: center;
}

.avatar {
    margin-left: 8px;
}
</style>