<script setup lang='ts'>

import { reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { editNews } from '@/services/news'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref<boolean>(false)
const newsId = ref()
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
})
const editLoading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        editForm.value.image = imageInput.value.files[0]
    }
}

const handleEditNews = async (data: any) => {
    editLoading.value = true
    try {
        await editNews(newsId.value, data)
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
            const formData = new FormData()
            formData.append('title', editForm.value.title)
            formData.append('body', editForm.value.body)
            formData.append('image', editForm.value.image)
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
    newsId.value = data.id
    editForm.value.title = data.title
    editForm.value.body = data.body
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa tin tức - sự kiện' width='40%' top='15vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
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
                <el-button type='primary' :loading='editLoading' @click='submitForm(editFormRef)'>
                    Sửa
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>