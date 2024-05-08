<script setup lang='ts'>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import NavigationDesktop from '@/layouts/NavigationDesktop.vue'

const authenticationStore = useAuthenticationStore()

authenticationStore.loadFromServer()
</script>

<template>
    <div class='common-layout'>
        <el-container>
            <el-aside width='auto'>
                <NavigationDesktop />
            </el-aside>
            <el-container>
                <el-header id='header'>
                    <Header />
                </el-header>
                <el-main id='main'>
                    <router-view></router-view>
                </el-main>
                <el-footer id='footer'>
                    <Footer />
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
#footer {
    height: auto;
    --el-footer-padding: 0;
    position: relative;
}
</style>