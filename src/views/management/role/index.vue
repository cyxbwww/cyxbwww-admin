<template>
  <div class="overflow-hidden">
    <n-card title="角色管理" :bordered="false" class="rounded-16px shadow-sm">
      <n-space class="pb-12px" justify="space-between">
        <n-space>
          <n-button type="primary" @click="handleAddTable">
            <icon-ic-round-plus class="mr-4px text-20px" />
            新增
          </n-button>
          <n-button type="error">
            <icon-ic-round-delete class="mr-4px text-20px" />
            删除
          </n-button>
          <n-button type="success">
            <icon-uil:export class="mr-4px text-20px" />
            导出Excel
          </n-button>
        </n-space>
        <n-space align="center" :size="18">
          <n-button size="small" type="primary" @click="getTableData">
            <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
            刷新表格
          </n-button>
        </n-space>
      </n-space>
      <n-data-table remote :loading="loading" :columns="columns" :data="tableData" :pagination="pagination" />
      <table-action-modal v-model:visible="visible" :type="modalType" :edit-data="editData" :get-data="getTableData" />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { Ref } from 'vue';
import { DataTableColumns, PaginationProps } from 'naive-ui';
import { fetchDeleteRole, fetchRoleList } from '@/service';
import { useBoolean } from '@/hooks';
import TableActionModal from './components/table-action-modal.vue';
import type { ModalType } from './components/table-action-modal.vue';

const { bool: visible, setTrue: openModal } = useBoolean();
const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean();

const tableData = ref<UserManagement.User[]>([]);
const columns: Ref<DataTableColumns> = ref([
  {
    key: 'id',
    title: '角色ID',
    align: 'center'
  },
  {
    key: 'name',
    title: '角色名称',
    align: 'center'
  },
  {
    key: 'permissions',
    title: '权限',
    align: 'center',
    render: row => {
      return row.permissions.map(v => <NTag class="m-4px">{v.desc}</NTag>);
    }
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'}>删除</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
]) as Ref<DataTableColumns>;
const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 30, 50],
  onChange: (page: number) => {
    pagination.page = page;
    getTableData();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    getTableData();
  }
});
const params = reactive({
  page: toRef(pagination, 'page'),
  pageSize: toRef(pagination, 'pageSize')
});

/** 获取角色列表 */
async function getTableData() {
  startLoading();
  const { data } = await fetchRoleList(params);
  if (data) {
    setTableData(data[0]);
    pagination.itemCount = data[1];
  }
  endLoading();
}

const modalType = ref<ModalType>('add');

function setModalType(type: ModalType) {
  modalType.value = type;
}

function handleAddTable() {
  openModal();
  setModalType('add');
}

async function handleEditTable(id) {
  const findItem = tableData.value.find(v => v.id === id);
  if (findItem) {
    findItem.permissionIds = findItem.permissions.map(v => v.id);
    setEditData(findItem);
  }
  setModalType('edit');
  openModal();
}

async function handleDeleteTable(id) {
  const { data } = await fetchDeleteRole({ id });
  if (data) {
    await getTableData();
  }
}

function setTableData(data) {
  tableData.value = data;
}

const editData = ref<UserManagement.User | null>(null);

function setEditData(data: UserManagement.User | null) {
  editData.value = data;
}

function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
