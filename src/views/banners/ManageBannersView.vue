<script setup lang='ts'>

import AddBannerModal from '@/components/modals/banners/AddBannerModal.vue'
import { onMounted, ref } from 'vue'
import { getAllBanner } from '@/services/banner'
import EditBannerModal from '@/components/modals/banners/EditBannerModal.vue'
import DeleteBannerModal from '@/components/modals/banners/DeleteBannerModal.vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { convertDateTime } from '@/helpers/convertDateTime'
import FAIcon from '@/components/common/FAIcon.vue'

const addBannerModal = ref<InstanceType<typeof AddBannerModal>>()
const editBannerModal = ref<InstanceType<typeof EditBannerModal>>()
const deleteBannerModal = ref<InstanceType<typeof DeleteBannerModal>>()
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
        const res = await getAllBanner(page)
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
        <h1>Quản Lý Ảnh Bìa</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm ảnh bìa...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-magnifying-glass' />
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addBannerModal?.openModal()'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-plus' />
                Thêm ảnh bìa
            </el-button>
        </div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có ảnh nào'
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
        <el-table-column label='Hoạt động' prop='isActive'>
            <template #default='{ row }'>
                <el-text tag='b' :type='(row.isActive === "true") ? "success" : "danger"' truncated>
                    {{ (row.isActive === "true") ? "Đang hoạt động" : "Không hoạt động" }}
                </el-text>
            </template>
        </el-table-column>
        <el-table-column label='Ảnh' prop='image'>
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
                <el-tooltip effect='dark' content='Chỉnh sửa ảnh bìa' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editBannerModal?.openModal(scope.row)'
                    >
                        <FAIcon color='' icon='fa-regular fa-pen-to-square' />
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa ảnh bìa' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteBannerModal?.openModal(scope.row)' plain>
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

    <AddBannerModal ref='addBannerModal' :call-back='() => loadTableData(1)' />
    <EditBannerModal ref='editBannerModal' :call-back='() => loadTableData(1)' />
    <DeleteBannerModal ref='deleteBannerModal' :call-back='() => loadTableData(1)' />
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