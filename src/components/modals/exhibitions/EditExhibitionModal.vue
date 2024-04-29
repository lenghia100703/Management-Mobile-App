<script setup lang='ts'>

import { ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive } from 'vue'
import { editExhibition } from '@/services/exhibition'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref(false)
const editLoading = ref(false)
const exhibitionId = ref()
const defaultData = ref<any>()
const imageInput = ref<HTMLInputElement | null>(null)
const editFormRef = ref<typeof ElForm | null>(null)

const editForm = ref({
    name: '',
    description: '',
    image: null,
    imageUrl: '',
})

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Vui lòng nhập tên hiện vật',
            trigger: 'blur',
        },
    ],
})

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        editForm.value.image = imageInput.value.files[0]
    }
}

const handleEditExhibition = async (data: any) => {
    editLoading.value = true
    try {
        await editExhibition(exhibitionId.value, data)
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
            formData.append('name', editForm.value.name)
            formData.append('description', editForm.value.description)
            formData.append('image', editForm.value.image)
            formData.append('imageUrl', editForm.value.imageUrl)
            await handleEditExhibition(formData)
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

const resetToDefault = (form: any) => {
    form.image = null
    form.name = defaultData.value.name
    form.description = defaultData.value.description
    form.imageUrl = defaultData.value.image
}

const openModal = (data: any) => {
    visible.value = true
    defaultData.value = data
    exhibitionId.value = data.id
    editForm.value.name = data.name
    editForm.value.description = data.description
    editForm.value.imageUrl = data.image
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa hiện vật' width='40%' top='8vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='name'>
                <el-input v-model='editForm.name' placeholder='Nhập tên hiện vật' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Nội dung:'>
                <el-input v-model='editForm.description' placeholder='Nhập chi tiết về hiện vật' type='textarea' spellcheck='false' />
            </el-form-item>
            <el-form-item label='Ảnh minh họa:' prop='imageUrl'>
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