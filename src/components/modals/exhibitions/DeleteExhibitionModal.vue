<script setup lang='ts'>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deleteExhibition } from '@/services/exhibition'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref(false)
const deleteLoading = ref(false)
const exhibitionId = ref()

const handleDeleteNews = async () => {
    deleteLoading.value = true
    try {
        await deleteExhibition(exhibitionId.value)
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
    exhibitionId.value = data.id
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Xóa hiện vật' width='30%' top='25vh'>
        <span> Bạn có muốn xóa tin tức - sự kiện có
            <el-text type='danger' class='news-id'> ID = {{ exhibitionId }} </el-text>
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