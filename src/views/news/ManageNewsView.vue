<script setup lang='ts'>

import AddNewsModal from '@/components/modals/news/AddNewsModal.vue'
import { onMounted, ref } from 'vue'
import { getAllNews } from '@/services/news'
import EditNewsModal from '@/components/modals/news/EditNewsModal.vue'
import DeleteNewsModal from '@/components/modals/news/DeleteNewsModal.vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { convertDateTime } from '@/helpers/convertDateTime'
import FAIcon from '@/components/common/FAIcon.vue'

const addNewsModal = ref<InstanceType<typeof AddNewsModal>>()
const editNewsModal = ref<InstanceType<typeof EditNewsModal>>()
const deleteNewsModal = ref<InstanceType<typeof DeleteNewsModal>>()
const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const handleChangePage = async (val: any) => {
    await loadTableData(val)
}

const handleSearch = async () => {
    await loadTableData(1)
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getAllNews(page)
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
        <h1>Quản Lý Tin Tức - Sự Kiện</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm tin tức - sự kiện...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-magnifying-glass' />
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addNewsModal?.openModal()'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-plus' />
                Thêm tin tức
            </el-button>
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
                <el-popover placement='bottom' :width='800' trigger='click'>
                    <template #reference>
                        <el-text truncated> {{ row.body }}</el-text>
                    </template>
                    <template #default>
                        <el-text style='max-width: 100%;'>
                            {{ row.body }}
                        </el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ảnh minh họa' prop='image'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :show-after='400' :width='300' trigger='hover'>
                    <template #reference>
                        <el-text truncated>
                            <el-link :href='row.image' target='_blank'>{{ row.image }}</el-link>
                        </el-text>
                    </template>
                    <template #default>
                        <el-image style='max-width: 300px; max-height: 300px;' :src='row.image' alt='Image' />
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
                <el-tooltip effect='dark' content='Chỉnh sửa tin tức - sự kiện' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editNewsModal?.openModal(scope.row)'
                    >
                        <FAIcon color='' icon='fa-regular fa-pen-to-square' />
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa tin tức - sự kiện' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteNewsModal?.openModal(scope.row)' plain>
                        <FAIcon color='' icon='fa-regular fa-trash-can' />
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

    <AddNewsModal ref='addNewsModal' :call-back='() => loadTableData(1)' />
    <EditNewsModal ref='editNewsModal' :call-back='() => loadTableData(1)' />
    <DeleteNewsModal ref='deleteNewsModal' :call-back='() => loadTableData(1)' />
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