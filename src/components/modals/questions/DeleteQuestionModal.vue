<script setup lang='ts'>

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deleteQuestion } from '@/services/question'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref(false)
const deleteLoading = ref(false)
const questionId = ref()

const handleDeleteQuestion = async () => {
    deleteLoading.value = true
    try {
        await deleteQuestion(questionId.value)
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
    questionId.value = data.id
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Xóa câu hỏi' width='30%' top='25vh'>
        <span> Bạn có muốn xóa câu hỏi có
            <el-text type='danger' class='news-id'> ID = {{ questionId }} </el-text>
            không ?
        </span>
        <template #footer>
            <span class='dialog-footer'>
                <el-button @click='visible = false'>Hủy</el-button>
                <el-button type='danger' :loading='deleteLoading' @click='handleDeleteQuestion'> Xóa </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>