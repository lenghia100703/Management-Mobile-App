<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { editLocation } from '@/services/location'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const editForm = ref({
    name: '',
    description: '',
    longitude: '',
    latitude: '',
})

const editFormRef = ref<typeof ElForm | null>(null)
const locationId = ref()
const defaultData = ref<any>()
const visible = ref<boolean>(false)
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Vui lòng nhập tên địa điểm',
            trigger: 'blur',
        },
    ],
    description: [
        {
            required: true,
            message: 'Vui lòng nhập chi tiết',
            trigger: 'blur',
        },
    ],
    longitude: [
        {
            required: true,
            message: 'Vui lòng nhập kinh độ',
            trigger: 'blur',
        },
    ],
    latitude: [
        {
            required: true,
            message: 'Vui lòng nhập vĩ độ',
            trigger: 'blur',
        },
    ],

})
const editLoading = ref<boolean>(false)

const handleEditLocation = async (data: any) => {
    editLoading.value = true
    try {
        await editLocation(locationId.value, data)
        await props.callBack()
        ElMessage({
            message: 'Sửa thành công',
            type: 'success',
        })
        resetForm(editForm.value)
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Sửa thất bại',
            type: 'error',
        })
    } finally {
        editLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const data = {
                name: editForm.value.name,
                description: editForm.value.description,
                longitude: editForm.value.longitude,
                latitude: editForm.value.latitude,
            }
            await handleEditLocation(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.name = defaultData.value.name
    form.description = defaultData.value.description
    form.longitude = defaultData.value.longitude
    form.latitude = defaultData.value.latitude
}

function openModal(data: any) {
    visible.value = true
    defaultData.value = data
    locationId.value = data.id
    editForm.value.name = data.name
    editForm.value.description = data.description
    editForm.value.longitude = data.longitude
    editForm.value.latitude = data.latitude
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa địa điểm' width='40%' top='8vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Tên:' prop='name'>
                <el-input v-model='editForm.name' placeholder='Nhập tên địa điểm' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Chi tiết:' prop='description'>
                <el-input v-model='editForm.description' placeholder='Nhập chi tiết' type='textarea' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Kinh độ:' prop='longitude'>
                <el-input v-model='editForm.longitude' placeholder='Nhập kinh độ' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Vĩ độ:' prop='latitude'>
                <el-input v-model='editForm.latitude' placeholder='Nhập vĩ độ' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetForm(editForm)'>Thiết lập lại</el-button>
            </span>
            <span class='right-dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button type='primary' :loading='editLoading' @click='submitForm(editFormRef)'>
                    Sửa
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.left-dialog-footer {
    float: left;
}
</style>