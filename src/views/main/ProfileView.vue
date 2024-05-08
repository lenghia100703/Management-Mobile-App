<script setup lang='ts'>

import { onMounted, reactive, ref } from 'vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import ChangePasswordModal from '@/components/modals/password/ChangePasswordModal.vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { editUser } from '@/services/user'
import { loadingFullScreen } from '@/utils/loadingFullScreen'

const useAuthentication = useAuthenticationStore()
const changePasswordModal = ref<InstanceType<typeof ChangePasswordModal>>()
const editLoading = ref(false)
const editFormRef = ref<typeof ElForm | null>(null)

const form = ref({
    email: useAuthentication.userInfo?.email,
    username: useAuthentication.userInfo?.username,
    phone: useAuthentication.userInfo?.phone,
    role: useAuthentication.userInfo?.role,
    avatar: useAuthentication.userInfo?.avatar
})

const rules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: 'Vui lòng nhập tên người dùng',
            trigger: 'blur',
        },
    ],
})

const handleSubmit = async (data: any) => {
    editLoading.value = true
    try {
        await editUser(useAuthentication.userInfo?.id, data)
        ElMessage({
            type: "success",
            message: "Sửa thành công"
        })
    } catch (e) {
        console.log(e)
        ElMessage({
            type: "error",
            message: "Sửa thất bại"
        })
    } finally {
        editLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return;
    formEl.validate(async (valid: any) => {
        if (valid) {
            const formData = new FormData()
            formData.append("email", form.value.email)
            formData.append("username", form.value.username)
            formData.append("phone", form.value.phone)
            formData.append("avatarUrl", form.value.avatar)
            await handleSubmit(formData);
        } else {
            return false;
        }
    });
};

const resetForm = (form: any) => {
    form.username = useAuthentication.userInfo?.username
    form.phone = useAuthentication.userInfo?.phone
}

onMounted(() => {
    useAuthentication.loadFromServer()
    loadingFullScreen()
})

</script>

<template>
    <div class='profile-page'>
        <h1>Thông tin tài khoản</h1>
        <br />
        <div class='user-container'>
            <div class='user-info-detail'>
                <el-form
                    label-position='left'
                    label-width='150px'
                    :model='form'
                    :rules='rules'
                    style='max-width: 600px'
                    ref='editFormRef'
                    :hide-required-asterisk='true'
                >
                    <div class='block avatar-image-block'>
                        <el-avatar
                            class='avatar-image'
                            :size='180'
                            :src='form.avatar'
                            referrerpolicy='no-referrer' />
                    </div>
                    <br />
                    <br />
                    <el-form-item label='Email' prop='email'>
                        <span class='user-info-detail'>
                            {{ form.email }}
                        </span>
                    </el-form-item>
                    <el-form-item label='Tên' prop='username'>
                        <el-input v-model='form.username' type='text' placeholder='Nhập họ tên' clearable
                                  spellcheck='false' />
                        <el-link
                            :underline='false'
                            class='btn-function'
                            @click='changePasswordModal?.openModal(useAuthentication.userInfo?.id)'
                        >Thay đổi mật khẩu
                        </el-link>
                    </el-form-item>
                    <el-form-item label='Số điện thoại' prop='phone'>
                        <el-input v-model='form.phone' type='text' placeholder='Nhập số điện thoại' clearable
                                  spellcheck='false' />
                    </el-form-item>
                    <el-form-item label='Vai trò' prop='role'>
                        <el-text class='user-info-detail' type='success' tag="b">
                            {{ form.role }}
                        </el-text>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' @click='submitForm(editFormRef)' :loading='editLoading'>
                            Lưu lại
                        </el-button>
                        <el-button @click='resetForm(form)'>
                            Thiết lập lại
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

    <ChangePasswordModal ref='changePasswordModal' />
</template>

<style scoped>
.profile-page {
    margin-left: 50px;
}

.avatar-image-block {
    text-align: center;
}
</style>