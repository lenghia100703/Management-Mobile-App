<script setup lang='ts'>

import AddNewsModal from '@/components/modals/news/AddNewsModal.vue'
import { onMounted, ref } from 'vue'
import { getAllNews } from '@/services/news'

const addNewsRef = ref<InstanceType<typeof AddNewsModal>>()
const tableData = ref<any[]>([])

onMounted(async () => {
    const res = await getAllNews()
    tableData.value = res
    console.table(res)
})
</script>

<template>
    <div class='title-page'>
        <h1>Quản Lý Tin Tức - Sự Kiện</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm tin tức - sự kiện...' type='text' v-model='searchName' clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch(1)'>
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
                <el-popover placement='bottom' :width='230' trigger='click' :content='row.image'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.image }}</el-text>
                    </template
                    >
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
        <el-table-column label='Ngày tạo' prop='createdAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.createdAt'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.createdAt }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='Hành động' width='130' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Chỉnh sửa tài khoản' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='updateAccountRef?.openModal(scope.row)'
                    >Sửa
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa tài khoản' placement='bottom'>
                    <el-button type='danger' size='small' @click='openDeleteModal(scope.row)' plain>Xóa</el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <div class='pagination'>
        <el-pagination
            :page-size='10'
            :pager-count='5'
            layout='prev, pager, next'
            :total='totalData'
            @current-change='handleChangePage'
        />
    </div>

    <AddNewsModal ref='addNewsRef' />
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
</style>