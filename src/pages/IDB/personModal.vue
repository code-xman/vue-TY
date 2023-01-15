<!--
 * @Description: person弹框
 * @Author: xiangjie
 * @Date: 2023-01-10 14:44:25
 * @LastEditors: xiangjie
 * @LastEditTime: 2023-01-12 11:22:03
-->

<template>
  <el-dialog
    v-model="show"
    width="80%"
    append-to-body
    title="person数据操作"
    :close-on-click-modal="false"
  >
    <div class="flex-all column">
      <el-scrollbar class="flex-1">
        <BaseForm
          ref="baseFormRef"
          v-bind="formAttr"
          v-model:valueObj="valueObj"
          :formList="formList"
        ></BaseForm>
      </el-scrollbar>
      <Btns class="flex-0 right" :btnList="btnList"></Btns>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { DefineComponent, ref, watch, computed } from 'vue';
// 组件
import { ElInput, ElInputNumber, ElMessage } from 'element-plus';
import BaseForm from '@/components/form/baseForm.vue';
import Btns from '@/components/button/boxBottomBtn.vue';
// 类型
import { FormItem } from '@/components/form/type';
import { btnItem } from '@/components/button/type';
import { personRowData } from './type';
// 数据
import { personParams } from './data';

const emit = defineEmits(['update:modelValue', 'on-close']);
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    idb: IDBDatabase | null;
    type: string;
    row: personRowData;
  }>(),
  {
    modelValue: false,
    idb: null,
    type: '',
    row: undefined,
  }
);
/** 是否是详情 */
const isDetail = computed(() => props.type === 'detail');

/** 弹框是否展示 */
const show = ref(<boolean>false);
/** form ref */
const baseFormRef = ref(<DefineComponent | null>null);
/** 表单属性 */
const formAttr = {
  labelPosition: 'right',
};
/** 表单各项 */
const formList: FormItem[] = [
  {
    name: 'id',
    label: '编号',
    tag: ElInput,
    required: true,
    attrs: {
      readonly: true,
    },
  },
  {
    name: 'name',
    label: '姓名',
    tag: ElInput,
    required: true,
    attrs: {
      clearable: true,
    },
  },
  {
    name: 'age',
    label: '年龄',
    tag: ElInputNumber,
    required: true,
    attrs: {
      max: 999,
      min: 0,
      step: 1,
      controls: false,
    },
  },
  {
    name: 'email',
    label: '邮件地址',
    tag: ElInput,
    required: true,
    attrs: {
      clearable: true,
    },
  },
];
/** 表单初始数据 */
const restval: personRowData = {
  id: '',
  name: null,
  age: null,
  email: null,
};
/** 表单数据 */
const valueObj = ref(<personRowData>{
  ...restval,
  id: new Date().getTime().toString(),
});

/** IDB 数据库 */
const idb = ref(<IDBDatabase | null>null);

/** 通过主键读取数据 */
const getDataByKey = (params: { storeName: string; keyPathVal: string }) => {
  const { storeName, keyPathVal } = params || {};
  try {
    if (!idb.value) throw `查询数据失败`;
    const transaction = idb.value?.transaction([storeName]); // 事务
    const objectStore = transaction?.objectStore(storeName); // 仓库对象
    const request = objectStore?.get(keyPathVal); // 通过主键获取数据

    request.onerror = function (event) {
      throw `查询数据失败`;
    };

    request.onsuccess = function (event) {
      // console.log('主键查询结果: ', request.result);
      valueObj.value = request.result;
    };
  } catch (error) {
    ElMessage({
      message: `${error}`,
      type: 'error',
      showClose: true,
    });
  }
};

/** 添加数据 */
const addData = (params: {
  /** 表名 */
  storeName: string;
  /** 操作类型（"只读"--readonly或"读写"--readwrite） */
  opType: IDBTransactionMode;
  /** 添加的具体数据 */
  personRowData: personRowData;
}) => {
  const { storeName, opType, personRowData } = params || {};
  try {
    if (!idb.value) throw `操作失败`;
    // 注意须在data.value有值的情况下操作
    const objectStore: IDBObjectStore = idb.value
      // 发起事务 指定表格名称和操作模式（"只读"--readonly或"读写"--readwrite）
      .transaction([storeName], opType)
      // 选择表对象
      .objectStore(storeName);

    // 添加具体数据
    const request: IDBRequest<IDBValidKey> = objectStore.add({
      ...personRowData,
    });

    // console.log('request :>> ', request);

    request.onsuccess = function (event: Event) {
      ElMessage({
        message: '添加数据成功',
        type: 'success',
        showClose: true,
      });
    };

    request.onerror = function (event: Event) {
      ElMessage({
        message: '添加数据失败',
        type: 'error',
        showClose: true,
      });
    };
  } catch (error) {
    throw error;
  }
};

/** 添加数据 */
const updateData = (params: {
  /** 表名 */
  storeName: string;
  /** 操作类型（"只读"--readonly或"读写"--readwrite） */
  opType: IDBTransactionMode;
  /** 添加的具体数据 */
  personRowData: personRowData;
}) => {
  const { storeName, opType, personRowData } = params || {};
  try {
    if (!idb.value) throw `操作失败`;
    // 注意须在data.value有值的情况下操作
    const objectStore: IDBObjectStore = idb.value
      // 发起事务 指定表格名称和操作模式（"只读"--readonly或"读写"--readwrite）
      .transaction([storeName], opType)
      // 选择表对象
      .objectStore(storeName);

    // 添加具体数据
    const request: IDBRequest<IDBValidKey> = objectStore.put({
      ...personRowData,
    });

    request.onsuccess = function (event: Event) {
      ElMessage({
        message: '修改数据成功',
        type: 'success',
        showClose: true,
      });
    };

    request.onerror = function (event: Event) {
      ElMessage({
        message: '修改数据失败',
        type: 'error',
        showClose: true,
      });
    };
  } catch (error) {
    throw error;
  }
};

/** 清除表单数据 */
const clearFormValue = () => {
  baseFormRef.value?.form.resetFields();
};
/** 表单验证 */
const formValidate = async () => {
  // 调用baseForm的验证方法validate，对表单进行验证
  const validateRes = await baseFormRef.value?.validate();
};

/** 底部按钮list */
const btnList = ref(<btnItem[]>[
  {
    key: 'close',
    name: '取消',
    click: () => {
      show.value = false;
    },
  },
  {
    key: 'query',
    name: '确认',
    show: true,
    attr: {
      type: 'primary',
    },
    click: async () => {
      try {
        const validateRes = await baseFormRef.value?.validate();
        if (!validateRes) return;
        if (props.type === 'add') {
          addData({
            storeName: personParams.name,
            opType: 'readwrite',
            personRowData: valueObj.value,
          });
        } else {
          updateData({
            storeName: personParams.name,
            opType: 'readwrite',
            personRowData: valueObj.value,
          });
        }
        emit('on-close');
        show.value = false;
      } catch (error) {
        ElMessage({
          message: `${error}`,
          type: 'error',
          showClose: true,
        });
      }
    },
  },
]);

/** 初始化 */
const init = () => {
  // 是否禁用表单各项
  formList.forEach((item) => {
    if (!item.attrs) {
      item.attrs = {};
    }
    if (props.type === 'edit' && item.name === 'id') {
      item.attrs.disabled = true;
    } else {
      item.attrs.disabled = isDetail.value;
    }
  });
  // 是否隐藏确定按钮
  const addDataBtn = btnList.value.find((item) => item.key === 'query');
  if (addDataBtn) {
    addDataBtn.show = !isDetail.value;
  }

  if (props.type === 'add') {
    valueObj.value = { ...restval, id: new Date().getTime().toString() };
  } else {
    getDataByKey({
      storeName: personParams.name,
      keyPathVal: props.row.id,
    });
  }
};

// 父级打开弹框，同步/初始化数据
watch(
  () => props.modelValue,
  (val) => {
    if (val && props.idb) {
      idb.value = props.idb;
      show.value = val;
      init();
    }
  }
);
// 自己关闭弹框，同步数据给父级
watch(
  () => show.value,
  (val) => {
    if (!val) {
      clearFormValue();
      emit('update:modelValue', val);
    }
  }
);
</script>

<style lang="less" scoped></style>
