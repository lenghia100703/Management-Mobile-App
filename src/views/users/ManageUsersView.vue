<script setup lang='ts'>

import { onMounted, ref } from 'vue'
import { getAllUsers } from '@/services/user'
import AddUserModal from '@/components/modals/users/AddUserModal.vue'
import EditUserModal from '@/components/modals/users/EditUserModal.vue'
import DeleteUserModal from '@/components/modals/users/DeleteUserModal.vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { convertDateTime } from '@/helpers/convertDateTime'

const tableData = ref<any[]>([])
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addUserModal = ref<InstanceType<typeof AddUserModal>>()
const editUserModal = ref<InstanceType<typeof EditUserModal>>()
const deleteUserModal = ref<InstanceType<typeof DeleteUserModal>>()

const handleChangePage = async () => {
    await loadTableData()
}

const handleSearch = async () => {
    await loadTableData()
}

const loadTableData = async () => {
    tableLoading.value = true
    try {
        const res = await getAllUsers()
        tableData.value = res
    } catch (e) {
        console.log(e)
    } finally {
        tableLoading.value = false
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadTableData()
})
</script>

<template>
    <div class='title-page'>
        <h1>Quản lý Người Dùng</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm người dùng...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addUserModal?.openModal()'>Thêm người dùng</el-button>
        </div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có người dùng nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column label='ID' prop='id' width='80' sortable :align="'center'"></el-table-column>
        <el-table-column label='Tên người dùng' prop='username' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.username'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.username }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Email' prop='email'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.email'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.email }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Số điện thoại' prop='phone'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.phone'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.phone }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ảnh đại diện' prop='avatar'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :show-after='400' :width='300' trigger='hover'>
                    <template #reference>
                        <el-text truncated>
                            <el-link :href='row.image' target='_blank'>{{ row.avatar }}</el-link>
                        </el-text>
                    </template>
                    <template #default>
                        <el-image style='max-width: 300px; max-height: 300px;' :src='row.avatar' alt='Image' />
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Người tạo' prop='createdBy'>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='200' :content='row.createdBy'>
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
                <el-popover placement='bottom' trigger='click' :width='200' :content='row.updatedBy'>
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
                <el-popover placement='bottom' trigger='click' :width='200' :content='convertDateTime(row.createdAt)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.createdAt) }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày sửa' prop='updatedAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='200' :content='convertDateTime(row.updatedAt)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.updatedAt) }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='Hành động' width='130' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Chỉnh sửa tài khoản' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editUserModal?.openModal(scope.row)'
                    >Sửa
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa tài khoản' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteUserModal?.openModal(scope.row)' plain>Xóa
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

    <AddUserModal ref='addUserModal' :call-back='() => loadTableData()' />
    <EditUserModal ref='editUserModal' :call-back='() => loadTableData()' />
    <DeleteUserModal ref='deleteUserModal' :call-back='() => loadTableData()' />
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