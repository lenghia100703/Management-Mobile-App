<script setup lang='ts'>

import { onMounted, ref } from 'vue'
import { getAllNews } from '@/services/news'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { convertDateTime } from '../../helpers/convertDateTime'
import AddExhibitionModal from '@/components/modals/exhibitions/AddExhibitionModal.vue'
import { getAllExhibition } from '@/services/exhibition'
import DeleteExhibitionModal from '@/components/modals/exhibitions/DeleteExhibitionModal.vue'
import EditExhibitionModal from '@/components/modals/exhibitions/EditExhibitionModal.vue'
import FAIcon from '@/components/common/FAIcon.vue'

const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addExhibitionModal = ref<InstanceType<typeof AddExhibitionModal>>()
const deleteExhibitionModal = ref<InstanceType<typeof DeleteExhibitionModal>>()
const editExhibitionModal = ref<InstanceType<typeof EditExhibitionModal>>()

const handleChangePage = async (val: any) => {
    await loadTableData(val)
}

const handleSearch = async () => {
    await loadTableData(1)
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getAllExhibition(page)
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
        <h1>Quản Lý Hiện Vật</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-input class='search-input' placeholder='Tìm hiện vật...' type='text' v-model='searchName'
                      clearable />
            <el-button type='primary' :loading='searchLoading' class='search-btn' @click='handleSearch'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-magnifying-glass' />
                Tìm kiếm
            </el-button>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-button plain type='primary' @click='addExhibitionModal?.openModal()'>
                <FAIcon color='' class='icon-margin' icon='fa-solid fa-plus' />
                Thêm hiện vật
            </el-button>
        </div>
    </div>
    <el-table
        :data='tableData'
        v-loading='tableLoading'
        :border='true'
        empty-text='Không có hiện vật nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column label='ID' prop='id' width='80' sortable :align="'center'"></el-table-column>
        <el-table-column label='Tên hiện vật' prop='name' sortable>
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
        <el-table-column label='Chi tiết hiện vật' prop='description'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='800' trigger='click'>
                    <template #reference>
                        <el-text truncated> {{ row.description }}</el-text>
                    </template>
                    <template #default>
                        <el-text style='max-width: 100%;'>
                            {{ row.description }}
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
                <el-tooltip effect='dark' content='Chỉnh sửa hiện vật' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editExhibitionModal?.openModal(scope.row)'
                    >
                        <FAIcon color='' icon='fa-regular fa-pen-to-square' />
                    </el-button
                    >
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa hiện vật' placement='bottom'>
                    <el-button type='danger' size='small' @click='deleteExhibitionModal?.openModal(scope.row)' plain>
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

    <AddExhibitionModal ref='addExhibitionModal' :call-back='() => loadTableData(1)' />
    <DeleteExhibitionModal ref='deleteExhibitionModal' :call-back='() => loadTableData(1)' />
    <EditExhibitionModal ref='editExhibitionModal' :call-back='() => loadTableData(1)' />
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