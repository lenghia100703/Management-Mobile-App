<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { editBanner } from '@/services/banner'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref<boolean>(false)
const bannerId = ref()
const defaultData = ref<any>()
const editFormRef = ref<typeof ElForm | null>(null)
const editForm = ref({
    title: '',
    isActive: '',
    image: null,
    imageUrl: '',
})

const rules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: 'Vui lòng nhập tên người dùng',
            trigger: 'blur',
        },
    ],
    isActive: [
        {
            required: true,
            message: 'Vui lòng nhập isActive',
            trigger: 'blur',
        },
    ],
})
const editLoading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)

const activeOptions = [
    {
        label: 'Đang hoạt động',
        value: 'true',
    },
    {
        label: 'Không hoạt động',
        value: 'false',
    },
];

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        editForm.value.image = imageInput.value.files[0]
    }
}

const handleEditBanner = async (data: any) => {
    editLoading.value = true
    try {
        await editBanner(bannerId.value, data)
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
            formData.append('isActive', editForm.value.isActive)
            formData.append('image', editForm.value.image)
            formData.append('imageUrl', editForm.value.imageUrl)
            await handleEditBanner(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.title = ''
    form.isActive = ''
    form.image = null
    form.imageUrl = ''
}

const resetToDefault = (form: any) => {
    form.image = null
    form.title = defaultData.value.title
    form.isActive = defaultData.value.isActive
    form.imageUrl = defaultData.value.image
}

const openModal = (data: any) => {
    visible.value = true
    bannerId.value = data.id
    editForm.value.title = data.title
    editForm.value.isActive = data.isActive
    editForm.value.imageUrl = data.image
    defaultData.value = data
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa ảnh bìa' width='40%' top='8vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='title'>
                <el-input v-model='editForm.title' placeholder='Nhập tên người dùng' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Trạng thái:' prop='isActive'>
                <el-select v-model="editForm.isActive" class="m-2" placeholder="Các trạng thái">
                    <el-option
                        v-for="(item, index) in activeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label='Ảnh minh họa:' prop='imageUrl'>
                <el-input v-model='editForm.imageUrl' placeholder='Nhập đường dẫn ảnh'
                          :disabled='editForm.image !== null' type='text' spellcheck='false' clearable />
            </el-form-item>
            <div class='or'>Hoặc chọn ảnh từ thiết bị:</div>
            <el-form-item prop='image'>
                <input
                    type='file'
                    class='image-input'
                    ref='imageInput'
                    :disabled="editForm.imageUrl !== ''"
                    @change='handleChangeImage'
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

.image-input {
    opacity: 0;
    width: 100px;
    height: 100px;
    z-index: 10;
    cursor: pointer;
}

.image-input:hover ~ .btn-up {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
}
</style>