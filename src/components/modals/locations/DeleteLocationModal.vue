<script setup lang='ts'>

import { ref } from 'vue'
import { deleteLocation } from '@/services/location'
import { ElMessage } from 'element-plus'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref(false)
const deleteLoading = ref(false)
const locationId = ref()

const handleDeleteLocation = async () => {
    deleteLoading.value = true
    try {
        await deleteLocation(locationId.value)
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
    locationId.value = data.id
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Xóa địa điểm' width='30%' top='25vh'>
        <span> Bạn có muốn xóa địa điểm có
            <el-text type='danger' class='news-id'> ID = {{ locationId }} </el-text>
            không ?
        </span>
        <template #footer>
            <span class='dialog-footer'>
                <el-button @click='visible = false'>Hủy</el-button>
                <el-button type='danger' :loading='deleteLoading' @click='handleDeleteLocation'> Xóa </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>