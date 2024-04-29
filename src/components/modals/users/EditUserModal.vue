<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { editUser } from '@/services/user'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref<boolean>(false)
const userId = ref()
const defaultData = ref<any>()
const editFormRef = ref<typeof ElForm | null>(null)
const editForm = ref({
    username: '',
    email: '',
    phone: '',
    avatar: null,
    avatarUrl: '',
})

const rules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: 'Vui lòng nhập tên người dùng',
            trigger: 'blur',
        },
    ],
    email: [
        {
            required: true,
            message: 'Vui lòng nhập email',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Vui lòng nhập đúng email',
            trigger: ['blur', 'change'],
        },
    ],
})
const editLoading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        editForm.value.avatar = imageInput.value.files[0]
    }
}

const handleEditUser = async (data: any) => {
    editLoading.value = true
    try {
        await editUser(userId.value, data)
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
            formData.append('username', editForm.value.username)
            formData.append('email', editForm.value.email)
            formData.append('phone', editForm.value.phone)
            formData.append('avatar', editForm.value.avatar)
            formData.append('avatarUrl', editForm.value.avatarUrl)
            await handleEditUser(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.title = ''
    form.body = ''
    form.avatar = null
    form.avatarUrl = ''
}

const resetToDefault = (form: any) => {
    form.avatar = null
    form.username = defaultData.value.username
    form.phone = defaultData.value.phone
    form.email = defaultData.value.email
    form.avatarUrl = defaultData.value.avatar
}

const openModal = (data: any) => {
    visible.value = true
    userId.value = data.id
    editForm.value.username = data.username
    editForm.value.email = data.email
    editForm.value.phone = data.phone
    editForm.value.avatarUrl = data.avatar
    defaultData.value = data
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa thông tin người dùng' width='40%' top='8vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Email:' prop='email'>
                <el-input v-model='editForm.email' placeholder='Nhập email' type='text' spellcheck='false' disabled />
            </el-form-item>
            <el-form-item label='Tên người dùng:' prop='username'>
                <el-input v-model='editForm.username' placeholder='Nhập tên người dùng' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Số điện thoại:' prop='phone'>
                <el-input v-model='editForm.phone' placeholder='Nhập số điện thoại' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Ảnh đại diện:' prop='avatarUrl'>
                <el-input v-model='editForm.avatarUrl' placeholder='Nhập đường dẫn ảnh'
                          :disabled='editForm.avatar !== null' type='text' spellcheck='false' clearable />
            </el-form-item>
            <div class='or'>Hoặc chọn ảnh từ thiết bị:</div>
            <el-form-item prop='avatar'>
                <input
                    type='file'
                    class='avatar-input'
                    ref='imageInput'
                    :disabled="editForm.avatarUrl !== ''"
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