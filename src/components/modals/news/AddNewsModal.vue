<script setup lang='ts'>

import { reactive, ref } from 'vue'
import { ElForm, FormRules } from 'element-plus'

const postForm = ref({
    title: '',
    body: '',
    image: null,
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const rules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: 'Vui lòng nhập tiêu đề',
            trigger: 'blur',
        },
    ],
    body: [
        {
            required: true,
            message: 'Vui lòng nhập nội dung',
            trigger: 'blur',
        },
    ],
    image: [
        {
            required: true,
            message: 'Vui lòng chọn ảnh minh họa',
            trigger: ['blur', 'change'],
        },
    ],
})
const createLoading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)

const handleCreateNews = (data: any) => {

}

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        postForm.value.image = postForm.value.files[0]
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            handleCreateNews(postForm.value)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.title = ''
    form.body = ''
    form.image = null
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
    <el-dialog v-model='visible' title='Tạo tin tức - sự kiện mới' width='40%' top='8vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='title'>
                <el-input v-model='postForm.username' type='text' />
            </el-form-item>
            <el-form-item label='Nội dung:' prop='body'>
                <el-input v-model='postForm.email' type='text' />
            </el-form-item>
            <el-form-item label='Ảnh minh họa' prop='image'>
                <input
                    type='file'
                    class='avatar-input'
                    ref='imageInput'
                    @change='handleChangeImage'
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button type='primary' :loading='createLoading' @click='submitForm(postFormRef)'>
                    Tạo mới
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>