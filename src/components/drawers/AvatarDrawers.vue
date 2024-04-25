<script setup lang="ts">
import { ref } from 'vue';
import { logout } from '@/services/auth.ts'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore.ts'
import { PATHS } from '@/router/paths.ts'
import { useRouter } from 'vue-router'

const authenticationStore = useAuthenticationStore()
const visible = ref<boolean>(false);
const userInfo = ref<any>();
const router = useRouter()

function openDrawer() {
    visible.value = true;
    userInfo.value = authenticationStore.userInfo;
}

const handleLogout = async () => {
    await authenticationStore.logout()
    await router.push(PATHS.LOGIN)
    visible.value = false;
};

defineExpose({
    openDrawer,
});
</script>
<template>
    <el-drawer v-model="visible" title="I am the title" :with-header="false" size="20%">
        <div class="name-user">
            <el-avatar :src="userInfo?.avatar" class="avatar-image" />
            <span class="avatar">{{ userInfo?.username }}</span>
        </div>
        <el-menu mode="vertical" :ellipsis="false" class="menu-bar" menu-trigger="click" router>
            <el-menu-item :route='PATHS.PROFILE' :index='PATHS.PROFILE'> Hồ sơ cá nhân </el-menu-item>
            <el-menu-item @click="handleLogout"> Đăng xuất </el-menu-item>
            <el-menu-item @click="visible = false"> Đóng </el-menu-item>
        </el-menu>
    </el-drawer>
</template>

<style scoped>
.el-menu {
    border: none;
}

.name-user {
    display: flex;
    align-items: center;
    padding: 10px 20px;
}

.avatar {
    margin-left: 8px;
}
</style>
