<script setup lang='ts'>

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { editQuestion } from '@/services/question'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const editForm = ref({
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: ''
})

const defaultData = ref<any>()
const questionId = ref()
const editFormRef = ref<typeof ElForm | null>(null)
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
const editLoading = ref<boolean>(false)

const handleCreateQuestion = async (data: any) => {
    editLoading.value = true
    try {
        await editQuestion(questionId.value, data)
        await props.callBack()
        ElMessage({
            message: 'Thêm thành công',
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
            const data = {
                question: editForm.value.question,
                answer1: editForm.value.answer1,
                answer2: editForm.value.answer2,
                answer3: editForm.value.answer3,
                answer4: editForm.value.answer4,
                correctAnswer: editForm.value.correctAnswer,
            }
            await handleCreateQuestion(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.question = defaultData.value.question
    form.answer1 = defaultData.value.answerId.answer1
    form.answer2 = defaultData.value.answerId.answer2
    form.answer3 = defaultData.value.answerId.answer3
    form.answer4 = defaultData.value.answerId.answer4
    form.correctAnswer = defaultData.value.correctAnswer
}

function openModal(data: any) {
    visible.value = true
    defaultData.value = data
    questionId.value = data.id
    editForm.value.question = data.question
    editForm.value.answer1 = data.answerId.answer1
    editForm.value.answer2 = data.answerId.answer2
    editForm.value.answer3 = data.answerId.answer3
    editForm.value.answer4 = data.answerId.answer4
    editForm.value.correctAnswer = data.correctAnswer
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa câu hỏi' width='40%' top='8vh'>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Câu hỏi:' prop='question'>
                <el-input v-model='editForm.question' placeholder='Nhập câu hỏi' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 1:' prop='answer1'>
                <el-input v-model='editForm.answer1' placeholder='Nhập đáp án 1' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 2:' prop='answer2'>
                <el-input v-model='editForm.answer2' placeholder='Nhập đáp án 2' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 3:' prop='answer3'>
                <el-input v-model='editForm.answer3' placeholder='Nhập đáp án 3' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án 4:' prop='answer4'>
                <el-input v-model='editForm.answer4' placeholder='Nhập đáp án 4' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Đáp án đúng:' prop='correctAnswer'>
                <el-input v-model='editForm.correctAnswer' placeholder='Nhập đáp án đúng' type='text' spellcheck='false'
                          clearable />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetForm(editForm)'>Thiết lập lại</el-button>
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
</style>