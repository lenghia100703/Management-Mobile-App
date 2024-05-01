<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { createLocation } from '@/services/location'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    name: '',
    description: '',
    longitude: '',
    latitude: '',
})

const postFormRef = ref<typeof ElForm | null>(null)
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
const createLoading = ref<boolean>(false)

const handleCreateLocation = async (data: any) => {
    createLoading.value = true
    try {
        await createLocation(data)
        await props.callBack()
        ElMessage({
            message: 'Thêm thành công',
            type: 'success',
        })
        resetForm(postForm.value)
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Thêm thất bại',
            type: 'error',
        })
    } finally {
        createLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const data = {
                name: postForm.value.name,
                description: postForm.value.description,
                longitude: postForm.value.longitude,
                latitude: postForm.value.latitude,
            }
            await handleCreateLocation(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.name = ''
    form.description = ''
    form.longitude = ''
    form.latitude = ''
}

function openModal() {
    visible.value = true
    resetForm(postForm.value)
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Tạo địa điểm mới' width='40%' top='8vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tên:' prop='name'>
                <el-input v-model='postForm.name' placeholder='Nhập tên địa điểm' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Chi tiết:' prop='description'>
                <el-input v-model='postForm.description' placeholder='Nhập chi tiết' type='textarea' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Kinh độ:' prop='longitude'>
                <el-input v-model='postForm.longitude' placeholder='Nhập kinh độ' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Vĩ độ:' prop='latitude'>
                <el-input v-model='postForm.latitude' placeholder='Nhập vĩ độ' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetForm(postForm)'>Thiết lập lại</el-button>
            </span>
            <span class='right-dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button type='primary' :loading='createLoading' @click='submitForm(postFormRef)'>
                    Tạo mới
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