<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { createTransaction } from '@/services/transaction'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    quantity: '',
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const rules = reactive<FormRules>({
    quantity: [
        {
            required: true,
            message: 'Vui lòng nhập số lượng vé',
            trigger: 'blur',
        },
    ],
})
const createLoading = ref<boolean>(false)

const handleCreateTransaction = async (data: any) => {
    createLoading.value = true
    try {
        await createTransaction(data)
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
                quantity: postForm.value.quantity,
            }
            await handleCreateTransaction(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.quantity = ''
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
    <el-dialog v-model='visible' title='Tạo giao dịch mới' width='40%' top='15vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Số lượng vé:' prop='quantity'>
                <el-input v-model='postForm.quantity' placeholder='Nhập số lượng vé' type='text' spellcheck='false'
                          clearable />
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