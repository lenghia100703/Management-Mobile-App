<script setup lang='ts'>

import { convertDateTime } from '@/helpers/convertDateTime'
import { ref } from 'vue'
import AddQuestionModal from '@/components/modals/questions/AddQuestionModal.vue'
import DeleteQuestionModal from '@/components/modals/questions/DeleteQuestionModal.vue'
import EditQuestionModal from '@/components/modals/questions/EditQuestionModal.vue'
import { onMounted } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getAllQuestion } from '@/services/question'

const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addQuestionModal = ref<InstanceType<typeof AddQuestionModal>>()
const deleteQuestionModal = ref<InstanceType<typeof DeleteQuestionModal>>()
const editQuestionModal = ref<InstanceType<typeof EditQuestionModal>>()

const handleChangePage = async () => {
    await loadTableData(1)
}

const handleSearch = async () => {
    await loadTableData(1)
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getAllQuestion(page)
        tableData.value = res.data
        totalData.value = res.totalData
    } catch (e) {
        console.log(e)
    } finally {
        tableLoading.value = false
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadTableData(1)
})
</script>

<template>
    <div class='title-page'>
        <h1>Quản Lý Câu Hỏi</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm câu hỏi...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addQuestionModal?.openModal()'>Thêm câu hỏi</el-button>
        </div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có câu hỏi nào nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column label='ID' prop='id' width='80' sortable :align="'center'"></el-table-column>
        <el-table-column label='Câu hỏi' prop='question' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.question'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.question }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Đáp án 1' prop='answer1'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.answerId.answer1'>
                    <template #reference>
                        <el-text truncated> {{ row.answerId.answer1 }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Đáp án 2' prop='answer2'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='hover' :content='row.answerId.answer2'>
                    <template #reference>
                        <el-text truncated>
                            {{ row.answerId.answer2 }}
                        </el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Đáp án 3' prop='answer3'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='hover' :content='row.answerId.answer3'>
                    <template #reference>
                        <el-text truncated>
                            {{ row.answerId.answer3 }}
                        </el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Đáp án 4' prop='answer4'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='hover' :content='row.answerId.answer4'>
                    <template #reference>
                        <el-text truncated>
                            {{ row.answerId.answer4 }}
                        </el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Đáp án đúng' prop='correctAnswer'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='hover' :content='row.correctAnswer'>
                    <template #reference>
                        <el-text truncated>
                            {{ row.correctAnswer }}
                        </el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Người tạo' prop='createdBy'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.createdBy'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.createdBy }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Người sửa' prop='updatedBy'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.updatedBy'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.updatedBy }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày tạo' prop='createdAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='convertDateTime(row.createdAt)'>
                    <template #reference
                    >
                        <el-text truncated> {{ convertDateTime(row.createdAt) }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày sửa' prop='updatedAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='convertDateTime(row.updatedAt)'>
                    <template #reference
                    >
                        <el-text truncated> {{ convertDateTime(row.updatedAt) }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='Hành động' width='130' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Chỉnh sửa câu hỏi' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editQuestionModal?.openModal(scope.row)'
                    >Sửa
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa câu hỏi' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteQuestionModal?.openModal(scope.row)' plain>Xóa
                    </el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <div class='pagination'>
        <el-pagination
            :page-size='8'
            layout='prev, pager, next'
            :total='totalData'
            @current-change='handleChangePage'
        />
    </div>

    <AddQuestionModal ref='addQuestionModal' :call-back='() => loadTableData(1)' />
    <DeleteQuestionModal ref='deleteQuestionModal' :call-back='() => loadTableData(1)' />
    <EditQuestionModal ref='editQuestionModal' :call-back='() => loadTableData(1)' />
</template>

<style scoped>
.title-page {
    text-align: center;
    margin-bottom: 28px;
}

.search {
    display: flex;
    margin-bottom: 20px;
}

.left {
    display: flex;
    float: left;
}

.right {
    display: flex;
    float: right;
}

.flex-grow {
    flex-grow: 1;
}

.search-input {
    min-width: 180px;
}

.search-btn {
    margin-left: 20px;
}

.pagination {
    float: right;
}
</style>