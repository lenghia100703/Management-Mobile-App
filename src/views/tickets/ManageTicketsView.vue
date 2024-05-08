<script setup lang='ts'>

import { convertDateTime } from '@/helpers/convertDateTime'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getAllTicket } from '@/services/ticket'
import DeleteTicketModal from '@/components/modals/tickets/DeleteTicketModal.vue'
import FAIcon from '@/components/common/FAIcon.vue'

const deleteTicketModal = ref<InstanceType<typeof DeleteTicketModal>>()
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
        const res = await getAllTicket(page)
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
        <h1>Quản lý Vé</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm vé...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-magnifying-glass' />
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có vé nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column label='ID' prop='id' width='80' sortable :align="'center'"></el-table-column>
        <el-table-column label='Mã giao dịch' prop='transactionId' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.transactionId.orderId'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.transactionId.orderId }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Số lượng người' width='150' :align="'center'" prop='quantity'>
            <template #default='{ row }'>
                <el-text truncated> {{ row.transactionId.quantity }}</el-text>
            </template>
        </el-table-column>
        <el-table-column label='Thành tiền' width='110' :align="'center'" prop='totalPrice'>
            <template #default='{ row }'>
                <el-text truncated> {{ row.totalPrice }} {{ row.transactionId.currency }}</el-text>
            </template>
        </el-table-column>

        <el-table-column label='Người đặt' prop='createdBy'>
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
        <el-table-column label='Ngày tạo' prop='createdAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='200' :content='convertDateTime(row.createdAt)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.createdAt) }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày hết hạn' prop='expiry' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='200' :content='convertDateTime(row.expiry)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.expiry) }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>

        <el-table-column fixed='right' label='Hành động' width='130' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Xóa vé' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteTicketModal?.openModal(scope.row)' plain>
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

    <DeleteTicketModal ref='deleteTicketModal' :call-back='() => loadTableData(1)' />
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