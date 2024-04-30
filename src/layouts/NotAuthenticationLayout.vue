<script setup lang='ts'>

import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
</script>

<template>
    <div class='common-layout'>
        <el-container>
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

</style>