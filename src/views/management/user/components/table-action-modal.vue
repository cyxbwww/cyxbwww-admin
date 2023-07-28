<template>
  <n-modal v-model:show="modalVisible" preset="card" :mask-closable="false" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="用户名" path="userName">
          <n-input v-model:value="formModel.userName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="密码" path="password">
          <n-input v-model:value="formModel.password" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="手机号" path="phone">
          <n-input v-model:value="formModel.phone" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="邮箱" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="userStatus">
          <n-select v-model:value="formModel.userStatus" :options="userStatusOptions" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="角色" path="userRoleIds">
          <n-select
            v-model:value="formModel.userRoleIds"
            multiple
            label-field="name"
            value-field="id"
            :options="roleOption"
          />
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
import { fetchRoleList, fetchCreateUser, fetchUpdateUser } from '@/service';
import { formRules, createRequiredFormRule } from '@/utils';
import { userStatusOptions } from '@/constants';
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
  editData?: UserManagement.User | null;
  /** 获取用户列表 */
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
    add: '添加用户',
    edit: '编辑用户'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<UserManagement.User, 'userName' | 'password' | 'phone' | 'email' | 'userStatus' | 'userRoleIds'>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  userName: formRules.userName,
  password: formRules.password,
  phone: formRules.phone,
  email: formRules.email,
  userStatus: createRequiredFormRule({ message: '请选择用户状态' }),
  userRoleIds: createRequiredFormRule({ message: '请选择用户角色', type: 'array' })
};
const roleOption = ref([]);
const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean();

function createDefaultFormModel(): FormModel {
  return {
    userName: null,
    password: null,
    phone: null,
    email: null,
    userStatus: null,
    userRoleIds: null
  };
}

/** 获取角色列表 */
async function getRoleData() {
  const { data } = await fetchRoleList();
  if (data) {
    setRoleData(data);
  }
}

function setRoleData(data) {
  roleOption.value = data;
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
    add: fetchCreateUser,
    edit: fetchUpdateUser
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

function init() {
  getRoleData();
}

init();
</script>
