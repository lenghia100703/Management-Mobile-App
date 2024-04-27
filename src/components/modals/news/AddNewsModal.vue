<script setup lang='ts'>

import { reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { createNews } from '@/services/news'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

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

const handleCreateNews = async (data: any) => {
    createLoading.value = true
    try {
        await createNews(data)
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

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        postForm.value.image = imageInput.value.files[0]
        console.log(postForm.value.image)
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const formData = new FormData()
            formData.append('title', postForm.value.title)
            formData.append('body', postForm.value.body)
            formData.append('image', postForm.value.image as File)
            await handleCreateNews(formData)
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
    <el-dialog v-model='visible' title='Tạo tin tức - sự kiện mới' width='40%' top='15vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='title'>
                <el-input v-model='postForm.title' type='text' />
            </el-form-item>
            <el-form-item label='Nội dung:' prop='body'>
                <el-input v-model='postForm.body' type='textarea' />
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