<template>
  <n-card title="用户管理" :bordered="false" class="rounded-16px shadow-sm">
    <n-space class="pb-12px" justify="space-between">
      <n-space>
        <n-button type="primary">
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
        <n-button size="small" type="primary">
          <icon-mdi-refresh class="mr-4px text-16px" />
          刷新表格
        </n-button>
      </n-space>
    </n-space>
    <n-data-table :data="tableData" :pagination="pagination" />
  </n-card>
</template>

<script setup lang="ts">
import type { PaginationProps } from 'naive-ui';
import { fetchUserList } from '@/service';
const tableData = ref<UserManagement.User[]>([]);

function setTableData(data: UserManagement.User[]) {
  tableData.value = data;
}

async function getTableData() {
  const { data } = await fetchUserList();
  if (data) {
    console.log(data);
  }
}

const pagination = reactive<PaginationProps>({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 30, 50],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});

function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
