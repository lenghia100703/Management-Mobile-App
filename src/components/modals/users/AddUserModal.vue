<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { createUser } from '@/services/user'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
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
    password: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
            trigger: 'blur',
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu',
            trigger: 'blur',
        },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value !== postForm.value.password) {
                    callback('Mật khẩu xác nhận không khớp')
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
})
const createLoading = ref<boolean>(false)

const handleCreateUser = async (data: any) => {
    createLoading.value = true
    try {
        await createUser(data)
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
            const data = {
                username: postForm.value.username,
                email: postForm.value.email,
                password: postForm.value.password,
                confirmPassword: postForm.value.confirmPassword,
            }
            await handleCreateUser(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.username = ''
    form.email = ''
    form.password = ''
    form.confirmPassword = ''
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
    <el-dialog v-model='visible' title='Tạo người dùng mới' width='40%' top='15vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tên người dùng:' prop='username'>
                <el-input v-model='postForm.username' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Email:' prop='email'>
                <el-input v-model='postForm.email' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Mật khẩu:' prop='password'>
                <el-input v-model='postForm.password' type='password' :show-password='true' clearable />
            </el-form-item>
            <el-form-item label='Nhập lại mật khẩu:' prop='confirmPassword'>
                <el-input v-model='postForm.confirmPassword' type='password' :show-password='true' clearable />
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
</style>