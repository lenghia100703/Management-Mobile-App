<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { ElForm, ElMessage, type FormRules } from 'element-plus'
import { login } from '@/services/auth'
import { useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const submitLoading = ref<boolean>(false)
const router = useRouter()
const authenticationStore = useAuthenticationStore()
const { authenticated } = storeToRefs(authenticationStore)

const loginForm = reactive({
    email: '',
    password: '',
})
const rules = reactive<FormRules<any>>({
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
})
const loginFormRef = ref<typeof ElForm | null>(null)

const handleLogin = async (user: any) => {
    try {
        submitLoading.value = true
        await login(user)
        await router.push(PATHS.HOME)
    } catch (e) {
        console.log(e)
        ElMessage.error(
            e.response?.data?.data
                ? e.response?.data?.data
                : 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại!',
        )
    } finally {
        submitLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            await handleLogin(loginForm)
        } else {
            return false
        }
    })
}

watch(
    authenticated,
    async (newAuth) => {
        if (newAuth) {
            await router.push(PATHS.HOME)
        }
    },
    {
        immediate: true,
    },
)

onMounted(() => {
    loadingFullScreen()
})
</script>

<template>
    <div class='container'>
        <el-row justify='center'>
            <el-col :xs='16' :sm='14' :md='12' :lg='8'>
                <el-card>
                    <template #header><h2 class='title'>Đăng nhập</h2></template>
                    <el-form label-position='top' :model='loginForm' :rules='rules' ref='loginFormRef'>
                        <el-form-item label='Email' prop='email'>
                            <el-input v-model='loginForm.email' type='text' clearable />
                        </el-form-item>
                        <el-form-item label='Mật khẩu' prop='password'>
                            <el-input v-model='loginForm.password' type='password' :show-password='true' />
                        </el-form-item>
                        <el-form-item>
                            <div class='action'>
                                <span class='redirect'>
                                    Bạn chưa có tài khoản?
                                    <router-link to='/register' class='to-register'>Đăng ký</router-link>
                                </span>
                                <el-button
                                    class='btn-submit'
                                    :loading='submitLoading'
                                    type='primary'
                                    @click='submitForm(loginFormRef)'
                                    @keyup.enter='submitForm(loginFormRef)'
                                    native-type='submit'
                                >
                                    Đăng nhập
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}


.btn-submit {
    width: 30%;
}
</style>