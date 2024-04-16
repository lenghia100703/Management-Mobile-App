<script setup lang='ts'>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import NavigationDesktop from '@/layouts/NavigationDesktop.vue'

</script>

<template>
    <div class='common-layout'>
        <el-container>
            <el-header id='header'>
                <Header />
            </el-header>
            <el-main id='main'>
<!--                <el-row>-->
<!--                    <el-col :span='4' class='hidden-xs-only'>-->
<!--                        <NavigationDesktop />-->
<!--                    </el-col>-->
<!--                    <el-col :xs='24' :sm='20' class='main-content'>-->
<!--                        <router-view></router-view>-->
<!--                    </el-col>-->
<!--                </el-row>-->
                <router-view></router-view>
            </el-main>
            <el-footer id='footer'>
                <Footer />
            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>

</style>