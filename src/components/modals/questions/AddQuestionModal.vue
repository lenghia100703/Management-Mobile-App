<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { createQuestion } from '@/services/question'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: ''
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const rules = reactive<FormRules>({
    question: [
        {
            required: true,
            message: 'Vui lòng nhập câu hỏi',
            trigger: 'blur',
        },
    ],
    answer1: [
        {
            required: true,
            message: 'Vui lòng nhập đáp án 1',
            trigger: 'blur',
        },
    ],
    answer2: [
        {
            required: true,
            message: 'Vui lòng nhập đáp án 2',
            trigger: 'blur',
        },
    ],
    answer3: [
        {
            required: true,
            message: 'Vui lòng nhập đáp án 3',
            trigger: 'blur',
        },
    ],
    answer4: [
        {
            required: true,
            message: 'Vui lòng nhập đáp án 4',
            trigger: 'blur',
        },
    ],
    correctAnswer: [
        {
            required: true,
            message: 'Vui lòng nhập đáp án đúng',
            trigger: 'blur',
        },
    ],

})
const createLoading = ref<boolean>(false)

const handleCreateQuestion = async (data: any) => {
    createLoading.value = true
    try {
        await createQuestion(data)
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
                question: postForm.value.question,
                answer1: postForm.value.answer1,
                answer2: postForm.value.answer2,
                answer3: postForm.value.answer3,
                answer4: postForm.value.answer4,
                correctAnswer: postForm.value.correctAnswer,
            }
            await handleCreateQuestion(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.question = ''
    form.answer1 = ''
    form.answer2 = ''
    form.answer3 = ''
    form.answer4 = ''
    form.correctAnswer = ''
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
    <el-dialog v-model='visible' title='Tạo câu hỏi mới' width='40%' top='8vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Câu hỏi:' prop='question'>
                <el-input v-model='postForm.question' placeholder='Nhập câu hỏi' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 1:' prop='answer1'>
                <el-input v-model='postForm.answer1' placeholder='Nhập đáp án 1' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 2:' prop='answer2'>
                <el-input v-model='postForm.answer2' placeholder='Nhập đáp án 2' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 3:' prop='answer3'>
                <el-input v-model='postForm.answer3' placeholder='Nhập đáp án 3' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 4:' prop='answer4'>
                <el-input v-model='postForm.answer4' placeholder='Nhập đáp án 4' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án đúng:' prop='correctAnswer'>
                <el-input v-model='postForm.correctAnswer' placeholder='Nhập đáp án đúng' type='text' spellcheck='false'
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