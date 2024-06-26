<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { editPost } from '@/services/post'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref<boolean>(false)
const postId = ref()
const defaultData = ref<any>()
const editFormRef = ref<typeof ElForm | null>(null)
const editForm = ref({
    title: '',
    image: null,
    imageUrl: '',
    description: ''
})

const rules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: 'Vui lòng nhập tiêu đề',
            trigger: 'blur',
        },
    ],
    description: [
        {
            required: true,
            message: 'Vui lòng nhập chi tiết',
            trigger: 'blur',
        },
    ]
})
const editLoading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        editForm.value.image = imageInput.value.files[0]
    }
}

const handleEditPost = async (data: any) => {
    editLoading.value = true
    try {
        await editPost(postId.value, data)
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
            formData.append('image', editForm.value.image)
            formData.append('imageUrl', editForm.value.imageUrl)
            formData.append('description', editForm.value.description)
            await handleEditPost(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.title = ''
    form.image = null
    form.imageUrl = ''
    form.description = ''
}

const resetToDefault = (form: any) => {
    form.image = null
    form.title = defaultData.value.title
    form.imageUrl = defaultData.value.image
    form.description = defaultData.value.description
}

const openModal = (data: any) => {
    visible.value = true
    postId.value = data.id
    editForm.value.title = data.title
    editForm.value.imageUrl = data.image
    editForm.value.description = data.description
    defaultData.value = data
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa bài viết' width='40%' top='8vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='title'>
                <el-input v-model='editForm.title' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Chi tiết:' prop='title'>
                <el-input v-model='editForm.description' placeholder='Nhập chi tiết' type='textarea' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Ảnh bài viết:' prop='imageUrl'>
                <el-input v-model='editForm.imageUrl' placeholder='Nhập đường dẫn ảnh'
                          :disabled='editForm.image !== null' type='text' spellcheck='false' clearable />
            </el-form-item>
            <div class='or'>Hoặc chọn ảnh từ thiết bị:</div>
            <el-form-item prop='image'>
                <input
                    type='file'
                    class='avatar-input'
                    ref='imageInput'
                    @change='handleChangeImage'
                    :disabled='editForm.imageUrl !== ""'
                    title='Chọn ảnh từ thiết bị của bạn'
                />
                <label class='btn-up' for='upload-file'>+</label>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetToDefault(editForm)'>Thiết lập lại</el-button>
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

.or {
    width: 100%;
    margin-bottom: 8px;
}

.left-dialog-footer {
    float: left;
}

label {
    padding: 32px 43px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    background-color: white;
    color: #8c939d;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    position: absolute;
    z-index: 2;
}

.avatar-input {
    opacity: 0;
    width: 100px;
    height: 100px;
    z-index: 10;
    cursor: pointer;
}

.avatar-input:hover ~ .btn-up {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
}
</style>