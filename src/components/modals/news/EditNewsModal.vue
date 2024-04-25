<script setup lang='ts'>

import { reactive, ref } from 'vue'
import { ElForm, FormRules } from 'element-plus'

const visible = ref<boolean>(false)
const editFormRef = ref<typeof ElForm | null>(null)
const editForm = ref({
    title: '',
    body: '',
    image: null,
})

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

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        editForm.value.image = imageInput.value.files[0]
        console.log(editForm.value.image)
    }
}

const handleEditNews = async (data: any) => {

}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const formData = new FormData()
            formData.append('title', editForm.value.title)
            formData.append('body', editForm.value.body)
            formData.append('image', editForm.value.image as File)
            await handleEditNews(formData)
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

const openModal = (data: any) => {
    visible.value = true
    editForm.value.title = data.title
    editForm.value.body = data.body
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa tin tức - sự kiện mới' width='40%' top='15vh'>
        <el-form :model='editForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='title'>
                <el-input v-model='editForm.title' type='text' />
            </el-form-item>
            <el-form-item label='Nội dung:' prop='body'>
                <el-input v-model='editForm.body' type='textarea' />
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
                <el-button type='primary' :loading='createLoading' @click='submitForm(editFormRef)'>
                    Sửa
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>