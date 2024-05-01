<script setup lang='ts'>

import { convertDateTime } from '@/helpers/convertDateTime'
import { ref } from 'vue'
import { getAllLocation } from '@/services/location'
import { onMounted } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import AddLocationModal from '@/components/modals/locations/AddLocationModal.vue'
import DeleteLocationModal from '@/components/modals/locations/DeleteLocationModal.vue'
import EditLocationModal from '@/components/modals/locations/EditLocationModal.vue'

const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addLocationModal = ref<InstanceType<typeof AddLocationModal>>()
const deleteLocationModal = ref<InstanceType<typeof DeleteLocationModal>>()
const editLocationModal = ref<InstanceType<typeof EditLocationModal>>()

const handleChangePage = async () => {
    await loadTableData(1)
}

const handleSearch = async () => {
    await loadTableData(1)
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getAllLocation(page)
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
        <h1>Quản Lý Địa Điểm</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm địa điểm...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addLocationModal?.openModal()'>Thêm địa điểm</el-button>
        </div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có địa điểm nào nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column label='ID' prop='id' width='80' sortable :align="'center'"></el-table-column>
        <el-table-column label='Tên' prop='name' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.name'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.name }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Chi tiết' prop='description'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.description'>
                    <template #reference>
                        <el-text truncated> {{ row.description }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Kinh độ' prop='longitude'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='hover' :content='row.longitude'>
                    <template #reference>
                        <el-text truncated>
                            {{ row.longitude }}
                        </el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Vĩ độ' prop='latitude'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='hover' :content='row.latitude'>
                    <template #reference>
                        <el-text truncated>
                            {{ row.latitude }}
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
                <el-tooltip effect='dark' content='Chỉnh sửa địa điểm' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editLocationModal?.openModal(scope.row)'
                    >Sửa
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa địa điểm' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteLocationModal?.openModal(scope.row)' plain>Xóa
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

    <AddLocationModal ref='addLocationModal' :call-back='() => loadTableData(1)' />
    <DeleteLocationModal ref='deleteLocationModal' :call-back='() => loadTableData(1)' />
    <EditLocationModal ref='editLocationModal' :call-back='() => loadTableData(1)' />
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