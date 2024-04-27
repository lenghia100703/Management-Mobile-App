<script setup lang='ts'>

import AddNewsModal from '@/components/modals/news/AddNewsModal.vue'
import { onMounted, ref } from 'vue'
import { getAllNews } from '@/services/news'
import EditNewsModal from '@/components/modals/news/EditNewsModal.vue'
import DeleteNewsModal from '@/components/modals/news/DeleteNewsModal.vue'

const addNewsRef = ref<InstanceType<typeof AddNewsModal>>()
const editNewsModal = ref<InstanceType<typeof EditNewsModal>>()
const deleteNewsModal = ref<InstanceType<typeof DeleteNewsModal>>()
const tableData = ref<any[]>([])
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const handleChangePage = async () => {
    await loadTableData()
}

const handleSearch = async () => {
    await loadTableData()
}

const loadTableData = async () => {
    tableLoading.value = true
    try {
        const res = await getAllNews()
        tableData.value = res
    } catch (e) {
        console.log(e)
    } finally {
        tableLoading.value = false
    }
}

onMounted(async () => {
    await loadTableData()
})
</script>

<template>
    <div class='title-page'>
        <h1>Quản Lý Tin Tức - Sự Kiện</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm tin tức - sự kiện...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addNewsRef?.openModal()'>Thêm tin tức</el-button>
        </div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có tin tức - sự kiện nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column label='ID' prop='id' width='80' sortable :align="'center'"></el-table-column>
        <el-table-column label='Tiêu đề' prop='title' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.title'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.title }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Nội dung' prop='body'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.body'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.body }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ảnh minh họa' prop='image'>
            <template #default='{ row }'>
                <el-popover placement='bottom'  trigger='hover'>
                    <template #reference>
                        <el-text truncated>
                            <el-link :href='row.image' target='_blank'>{{ row.image }}</el-link>
                        </el-text>
                    </template>
                    <template #default>
                        <el-image style='max-width: 200px; max-height: 200px;' :src='row.image' alt='Image' />
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Người tạo' prop='createdBy'>
            <template #default='{ row }'>
                <el-popover placement='bottom'  trigger='click' :content='row.createdBy'>
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
                <el-popover placement='bottom'  trigger='click' :content='row.updatedBy'>
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
                <el-popover placement='bottom'  trigger='click' :content='row.createdAt'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.createdAt }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày sửa' prop='updatedAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom'  trigger='click' :content='row.updatedAt'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.updatedAt }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='Hành động' width='130' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Chỉnh sửa tài khoản' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editNewsModal?.openModal(scope.row)'
                    >Sửa
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa tài khoản' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteNewsModal?.openModal(scope.row)' plain>Xóa
                    </el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <div class='pagination'>
        <el-pagination
            :page-size='5'
            :pager-count='5'
            layout='prev, pager, next'
            :total='tableData.length'
            @current-change='handleChangePage'
        />
    </div>

    <AddNewsModal ref='addNewsRef' :call-back='() => loadTableData()' />
    <EditNewsModal ref='editNewsModal' :call-back='() => loadTableData()' />
    <DeleteNewsModal ref='deleteNewsModal' :call-back='() => loadTableData()' />
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