<script setup lang='ts'>

import { ref } from 'vue'
import { deleteNews } from '@/services/news'
import { ElMessage } from 'element-plus'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref(false)
const deleteLoading = ref(false)
const newsId = ref()

const handleDeleteNews = async () => {
    deleteLoading.value = true
    try {
        await deleteNews(newsId.value)
        await props.callBack()
        ElMessage({
            message: 'Xóa thành công',
            type: 'success',
        })
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Xóa thất bại',
            type: 'error',
        })
    } finally {
        deleteLoading.value = false
    }
}

const openModal = (data: any) => {
    visible.value = true
    newsId.value = data.id
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Xóa tin tức - sự kiện' width='30%' top='25vh'>
        <span> Bạn có muốn xóa tin tức - sự kiện có
            <el-text type='danger' class='news-id'> ID = {{ newsId }} </el-text>
            không ?
        </span>
        <template #footer>
            <span class='dialog-footer'>
                <el-button @click='visible = false'>Hủy</el-button>
                <el-button type='danger' :loading='deleteLoading' @click='handleDeleteNews'> Xóa </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>