<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { editUser } from '@/services/user'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref<boolean>(false)
const userId = ref()
const editFormRef = ref<typeof ElForm | null>(null)
const editForm = ref({
    username: '',
    email: '',
    phone: '',
    avatar: null
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
        await props.callBack();
        ElMessage({
            message: 'Sửa thành công',
            type: 'success',
        });
        resetForm(editForm.value)
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Sửa thất bại',
            type: 'error',
        });
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
            await handleEditUser(formData)
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
    userId.value = data.id
    editForm.value.username = data.username
    editForm.value.email = data.email
    editForm.value.phone = data.phone
}

defineExpose({
    openModal
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa thông tin người dùng' width='40%' top='15vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Email:' prop='email'>
                <el-input v-model='editForm.email' type='text' disabled />
            </el-form-item>
            <el-form-item label='Tên người dùng:' prop='username'>
                <el-input v-model='editForm.username' type='text' />
            </el-form-item>
            <el-form-item label='Số điện thoại:' prop='phone'>
                <el-input v-model='editForm.phone' type='text' />
            </el-form-item>
            <el-form-item label='Ảnh đại diện' prop='avatar'>
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