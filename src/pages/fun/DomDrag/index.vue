<template>
  <div class="Dom-Drag flex-all column">
    <div class="flex-1 overflow-auto flex">
      <div class="options scroll_thin">
        <div v-for="item in options" :key="item" :id="item" class="option-item">
          {{ item }}
        </div>
      </div>
      <div class="content flex-1">
        <el-form
          ref="formRef"
          class="form-content scroll_thin flex flex-wrap baseForm"
          :model="valObj"
          label-position="left"
        >
          <div
            v-for="item in contents"
            :key="item.id"
            class="content-item"
            :class="[
              formItemSelectedId === item.id ? 'active' : '',
              `item-${item.type}`,
            ]"
            :style="`width: ${item.width || 'calc(50% - 5px)'}`"
            @click.self="() => formItemClick(item)"
          >
            <el-form-item
              :prop="item.name"
              :label="item.label"
              :required="item.required || false"
              @click.stop="() => formItemClick(item)"
            >
              <BaseFormItem
                :tag="item.tag"
                :bind="item.attrs || {}"
                :model="valObj[item.name]"
                @click.stop
                @valChange="(val) => valChange(val, item.name)"
              ></BaseFormItem>
            </el-form-item>
            <div class="remove-box">
              <el-icon class="icon_remove" @click="() => removeFn(item)">
                <CloseBold />
              </el-icon>
            </div>
          </div>
        </el-form>
      </div>
      <div class="attrs scroll_thin">
        <BaseForm
          v-bind="{ labelPosition: 'left' }"
          :formList="formList"
          v-model:valueObj="formItemSelectedValue"
        ></BaseForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CloseBold } from '@element-plus/icons-vue';
import Sortable from 'sortablejs';
import { cloneDeep } from 'lodash';

import BaseForm from '@/components/form/baseForm.vue';
import BaseFormItem from '@/baseComponents/BaseFormItem.vue';
import { isEmpty } from '@/common/utils/common';
import { FormItemType, ItemObj } from '@/pages/fun/DomDrag/type';
import { optionData } from '@/pages/fun/DomDrag/baseAttrs';
import {
  FormItemAttrObj,
  FormValueObj,
  ItemAttrObj,
} from '@/pages/fun/DomDrag/baseData';

const options = ref(<string[]>[...optionData]);
const contents = ref(<ItemObj[]>[]);
const selectedItem = ref(<string>'');

// 拖拽相关逻辑
const initSortable = () => {
  // 左
  const options = document.querySelector('.options');
  new Sortable.create(options, {
    group: {
      name: 'options',
      pull: 'clone', // 列表单元移出，移动的为该元素的副本；
      put: false, // 不允许拖拽进这个列表
    },
    animation: 150, //动画
    handle: '.option-item', //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    sort: false, // 设为false，禁止sort
    onChoose: (evt: any) => {
      // console.log('evt :>> ', evt);
      selectedItem.value = evt.item.innerText;
    },
    // 结束拖拽
    onEnd: function (/**Event*/ evt: any) {
      if (evt.pullMode === 'clone') {
        evt.item?.remove();
      }
    },
  });

  // 中
  const formContent = document.querySelector('.form-content');
  new Sortable.create(formContent, {
    group: { name: 'formContent', put: true },
    animation: 150, //动画
    handle: '.content-item', //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    onAdd: (evt: any) => {
      const id = new Date().getTime().toString();
      contents.value.splice(evt.newIndex, 0, {
        attrs: {},
        // ItemAttrObj 是公用的，不深拷贝会影响同类型的其他item的引用对象 eg.attrs.options
        ...cloneDeep(ItemAttrObj[selectedItem.value]),
        id: id,
        type: selectedItem.value,
        name: `${selectedItem.value}${id}`,
        label: `${selectedItem.value}${id}`,
      });

      valObj.value[`${selectedItem.value}${id}`] = '';

      // 给选中的contents的item的 attrs部分 对应的属性表单赋默认值
      formValue.value[id] = cloneDeep(FormValueObj[selectedItem.value]);
    },
  });
};

// 移除某项
const removeFn = (item: ItemObj) => {
  contents.value = contents.value.filter((ci) => ci.id !== item.id);
};

// attrs各项
const formList = ref(<FormItemType[]>[]);
// attrs数据 contents的每一项的formValue的数据 结构为：{id1: {}, id2: {},...}
const formValue = ref(<any>{});
// 选中进行完善的formItem的 id
const formItemSelectedId = ref(<string>'');
// 选中进行完善的formItem的 formValue
const formItemSelectedValue = ref(<any>{});

// 点击某项
const formItemClick = (item: ItemObj) => {
  // 记录选中的contents的item的id
  formItemSelectedId.value = item.id;
  // 给选中的contents的item的 attrs部分 对应的属性表单
  formList.value = FormItemAttrObj[item.type];
  // 获取attrs的表单的key值数组
  const keys = formList.value?.map((f) => f.name);
  // 循环keys，给选中的contents的item的 attrs部分 将已有随机值给对应的属性表单. eg.label
  keys.forEach((key, i) => {
    const inAttrs = formList.value[i]?.inAttrs;
    if (inAttrs) {
      formValue.value[formItemSelectedId.value][key] =
        item.attrs[key as keyof ItemObj];
    } else {
      formValue.value[formItemSelectedId.value][key] =
        item[key as keyof ItemObj];
    }
  });

  formItemSelectedValue.value = formValue.value[formItemSelectedId.value] || {};
};

// 监听 attrs 部分的form的值的变动，同步修改contents的属性
watch(
  () => formItemSelectedValue.value,
  () => {
    formValue.value[formItemSelectedId.value] = cloneDeep(
      formItemSelectedValue.value
    );
    const sItem: ItemObj | undefined = contents.value.find(
      (item) => item.id === formItemSelectedId.value
    );
    if (!sItem) return;
    // 获取attrs的表单的key值数组
    const keys = Object.keys(formValue.value[formItemSelectedId.value]);
    // 循环keys，选中的contents的item 将attrs的数据 --> contents部分
    keys.forEach((key) => {
      if (isEmpty(formValue.value[formItemSelectedId.value]?.[key])) return;
      // 判断是否是在attrs里面
      const inAttrs = formList.value.find((f) => f.name === key)?.inAttrs;
      if (inAttrs) {
        // 是 给到对应的formItem的attrs
        sItem.attrs[key as keyof ItemObj] =
          formValue.value[formItemSelectedId.value]?.[key];
      } else {
        // 否 给到对应的formItem
        sItem[key as keyof ItemObj] =
          formValue.value[formItemSelectedId.value]?.[key];
      }
    });
  },
  {
    deep: true,
  }
);

onMounted(() => {
  initSortable();
});

const valObj = ref(<any>{});

const valChange = (val: any, name: string) => {
  valObj.value[name] = val;
};
</script>

<style lang="less" scoped>
.options {
  margin-right: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 160px;
  height: 100%;
  padding: 10px;
  overflow: auto;
  .option-item {
    margin-bottom: 10px;
    box-sizing: border-box;
    border: 1px solid #409eff;
    border-radius: 5px;
    width: 100%;
    padding: 10px 10px;
    text-align: center;
    color: #409eff;
    background-color: #ecf5ff;
    cursor: grab;
  }
}
.content {
  margin-right: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 100%;
  padding: 10px;

  .form-content {
    height: 100%;
    overflow: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;

    .content-item {
      margin-bottom: 10px;
      box-sizing: border-box;
      border: 1px dashed #409eff;
      border-radius: 5px;
      width: calc(50% - 5px);
      min-height: 48px;
      padding: 8px;
      text-align: center;
      color: #409eff;
      background-color: #ecf5ff;
      cursor: grab;
      overflow: hidden;

      position: relative;

      .remove-box {
        position: absolute;
        top: -8px;
        right: -8px;

        width: 24px;
        height: 24px;
        background: #f56c6c;
        border: 1px solid #f56c6c;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;

        .icon_remove {
          font-size: 14px;
          color: #fff;
          margin-left: -4px;
          margin-top: 8px;
        }
      }

      &.active {
        border: 1px dashed #67c23a;
        color: #67c23a;
        background-color: #f0f9eb;
      }
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
      .el-form-item__label {
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .el-select {
        width: 100%;
      }
    }
  }
}

.attrs {
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
  height: 100%;
  overflow: auto;

  .el-form {
    width: 100%;
    :deep(.el-form-item) {
      width: 100% !important;
    }
  }
}
</style>
