<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { createPost } from '@/services/post'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    title: '',
    image: null,
    imageUrl: ''
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)

const validateImageUrlOrImageFile = (rule: any, value: any, callback: any) => {
    if (!postForm.value.imageUrl && !postForm.value.image) {
        callback(new Error('Vui lòng nhập đường dẫn ảnh hoặc chọn ảnh'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: 'Vui lòng nhập tiêu đề',
            trigger: 'blur',
        },
    ],
    imageUrl: [
        {
            trigger: ['blur', 'change'],
            validator: validateImageUrlOrImageFile,
        },
    ],
    image: [
        {
            trigger: ['blur', 'change'],
            validator: validateImageUrlOrImageFile,
        },
    ],
})
const createLoading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)

const handleCreatePost = async (data: any) => {
    createLoading.value = true
    try {
        await createPost(data)
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
            formData.append('image', postForm.value.image as File)
            formData.append('imageUrl', postForm.value.imageUrl)
            await handleCreatePost(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.title = ''
    form.image = null
    form.imageUrl = ''
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
    <el-dialog v-model='visible' title='Tạo bài viết mới' width='40%' top='8vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='title'>
                <el-input v-model='postForm.title' placeholder='Nhập tiêu đề' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Ảnh bài viết:' prop='imageUrl'>
                <el-input v-model='postForm.imageUrl' placeholder='Nhập đường dẫn ảnh' :disabled='postForm.image !== null' type='text' spellcheck='false' clearable />
            </el-form-item>
            <div class='or'>Hoặc chọn ảnh từ thiết bị:</div>
            <el-form-item prop='image'>
                <input
                    type='file'
                    class='avatar-input'
                    ref='imageInput'
                    @change='handleChangeImage'
                    :disabled='postForm.imageUrl !== ""'
                    title='Chọn ảnh từ thiết bị của bạn'
                />
                <label class="btn-up" for="upload-file">+</label>
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