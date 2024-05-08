<script setup lang='ts'>

import { onMounted, ref } from 'vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getBannerIsActive } from '@/services/banner'
import Footer from '@/components/common/Footer.vue'

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
const data = ref([])

const loadData = async () => {
    try {
        data.value = await getBannerIsActive()
    } catch (e) {
        console.log(e)
    }
}

onMounted(async () => {
    await loadData()
    loadingFullScreen()
})
</script>

<template>
    <el-carousel :interval='5000' trigger='click' arrow='always' height='337px'>
        <el-carousel-item style='height: 400px' v-for='item in data' :key='item'>
            <el-image :src='item.image' fit='fill' />
        </el-carousel-item>
    </el-carousel>

    <div class='introduce'>
        <el-row>
            <el-col :span='8'>
                <el-image src='https://hoangthanhthanglong.com/store/uploads/2018/11/h1.png' />
            </el-col>
            <el-col :span='16'>
                <el-text size='large'>
                    Hoàng thành Thăng Long là quần thể công trình kiến trúc đồ sộ được các triều vua xây dựng trong
                    nhiều giai đoạn lịch sử và trở thành di tích quan trọng bậc nhất trong hệ thống các di tích Việt
                    Nam, với những giá trị nổi bật toàn cầu Hoàng Thành Thăng Long đã được UNESCO công nhận là Di sản
                    văn hóa của nhân loại,...
                </el-text>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.introduce {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
}
</style>