<script setup lang='ts'>

import { convertDateTime } from '@/helpers/convertDateTime'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getAllTransaction } from '@/services/transaction'
import DeleteTransactionModal from '@/components/modals/transactions/DeleteTransactionModal.vue'
import AddTransactionModal from '@/components/modals/transactions/AddTransactionModal.vue'
import FAIcon from '@/components/common/FAIcon.vue'

const deleteTransactionModal = ref<InstanceType<typeof DeleteTransactionModal>>()
const addTransactionModal = ref<InstanceType<typeof AddTransactionModal>>
const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const handleChangePage = async (val: any) => {
    await loadTableData(val)
}

const isSuccess = (code: any) => {
    if (code === 'SUCCESS') return true
    else return false
}

const handleSearch = async () => {
    await loadTableData(1)
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getAllTransaction(page)
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
        <h1>Quản Lý Giao Dịch</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm giao dịch...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-magnifying-glass' />
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addTransactionModal?.openModal()'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-plus' />
                Thêm giao dịch
            </el-button>
        </div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có giao dịch nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column label='ID' prop='id' width='80' sortable :align="'center'"></el-table-column>
        <el-table-column label='Người đặt vé' prop='user' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.userId.email'>
                    <template #reference>
                        <el-text truncated> {{ row.userId.email }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Mã giao dịch' prop='orderId'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.orderId'>
                    <template #reference>
                        <el-text truncated> {{ row.orderId }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Phương thức giao dịch' width='180' :align="'center'" prop='paymentMethod'>
            <template #default='{ row }'>
                <el-text truncated> {{ row.paymentMethod }}</el-text>
            </template>
        </el-table-column>
        <el-table-column label='Số lượng người' width='150' :align="'center'" prop='quantity'>
            <template #default='{ row }'>
                <el-text truncated> {{ row.quantity }}</el-text>
            </template>
        </el-table-column>
        <el-table-column label='Thành tiền' width='110' :align="'center'" prop='totalPrice'>
            <template #default='{ row }'>
                <el-text truncated> {{ row.totalPrice }} {{ row.currency }}</el-text>
            </template>
        </el-table-column>
        <el-table-column label='Trạng thái' width='120' :align="'center'" prop='status'>
            <template #default='{ row }'>
                <el-text tag='b' :type='isSuccess(row.status) ? "success" : "warning"'>
                    {{ isSuccess(row.status) ? 'Thành công' : 'Đang xử lý' }}
                </el-text>
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

        <el-table-column fixed='right' label='Hành động' width='100' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Xóa giao dịch' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteTransactionModal?.openModal(scope.row)' plain>
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

    <AddTransactionModal ref='addTransactionModal' :call-back='() => loadTableData(1)' />
    <DeleteTransactionModal ref='deleteTransactionModal' :call-back='() => loadTableData(1)' />
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