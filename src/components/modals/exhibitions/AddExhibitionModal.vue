<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { createExhibition } from '@/services/exhibition'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    name: '',
    description: '',
    imageUrl: '',
    image: null,
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const imageUrlDisable = ref(false)
const imageInput = ref<HTMLInputElement | null>(null)
const createLoading = ref<boolean>(false)

const validateImageUrlOrImageFile = (rule: any, value: any, callback: any) => {
    if (!postForm.value.imageUrl && !postForm.value.image) {
        callback(new Error('Vui lòng nhập đường dẫn ảnh hoặc chọn ảnh'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Vui lòng nhập tên hiện vật',
            trigger: 'blur',
        },
    ],
    description: [
        {
            required: true,
            message: 'Vui lòng nhập chi tiết hiện vật',
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


const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        postForm.value.image = imageInput.value.files[0]
        imageUrlDisable.value = true
    }
}

const handleCreateExhibition = async (data: any) => {
    createLoading.value = true
    try {
        await createExhibition(data)
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
            const formData = new FormData()
            formData.append('name', postForm.value.name)
            formData.append('description', postForm.value.description)
            formData.append('image', postForm.value.image as File)
            await handleCreateExhibition(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.name = ''
    form.description = ''
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
    <el-dialog v-model='visible' title='Tạo hiện vật mới' width='40%' top='15vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tên hiện vật:' prop='name'>
                <el-input v-model='postForm.name' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Chi tiết hiện vật:' prop='description'>
                <el-input v-model='postForm.description' spellcheck='false' type='textarea' />
            </el-form-item>

            <el-form-item label='Ảnh minh họa:' prop='imageUrl'>
                <el-input v-model='postForm.imageUrl' :disabled='postForm.image !== null' type='text' spellcheck='false' clearable />
            </el-form-item>
            <div class='or'>Hoặc chọn ảnh từ thiết bị:</div>
            <el-form-item prop='image'>
                <input
                    type='file'
                    class='avatar-input'
                    ref='imageInput'
                    :disabled="postForm.imageUrl !== ''"
                    @change='handleChangeImage'
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