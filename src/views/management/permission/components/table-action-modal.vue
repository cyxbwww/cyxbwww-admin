<template>
  <n-modal v-model:show="modalVisible" preset="card" :mask-closable="false" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="权限名" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="权限简介" path="desc">
          <n-input v-model:value="formModel.desc" />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" :loading="loading" @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { FormInst, FormItemRule } from 'naive-ui';
import { fetchCreatePermission, fetchUpdatePermission } from '@/service';
import { createRequiredFormRule } from '@/utils';
import { useBoolean } from '@/hooks';

defineOptions({ name: 'TableActionModal' });

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: 'add' | 'edit';
  /** 编辑的表格行数据 */
  editData?: null;
  /** 获取角色列表 */
  getData?: () => void;
}

export type ModalType = NonNullable<Props['type']>;

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null,
  getData: null
});

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});

const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加角色',
    edit: '编辑角色'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<PermissionManagement.Permission, 'name' | 'desc'>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  name: createRequiredFormRule({ message: '请输入权限名' }),
  desc: createRequiredFormRule({ message: '请输入简介' })
};
const roleOption = ref([]);
const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean();

function createDefaultFormModel(): FormModel {
  return {
    name: null,
    desc: null
  };
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };

  handlers[props.type]();
}

function handleSubmitByModalType() {
  const handles: Record<ModalType, Function> = {
    add: fetchCreatePermission,
    edit: fetchUpdatePermission
  };

  return handles[props.type];
}

async function handleSubmit() {
  await formRef.value?.validate();

  startLoading();
  const fetch = handleSubmitByModalType();
  const { data } = await fetch(formModel);
  if (data) {
    window.$message?.success(data);
    props.getData();
    closeModal();
  }
  endLoading();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
</script>
