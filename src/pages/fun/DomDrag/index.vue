<template>
  <div class="Dom-Drag flex-all column">
    <div class="flex-1 overflow-auto flex">
      <div class="options">
        <div v-for="item in options" :key="item" :id="item" class="item">
          {{ item }}
        </div>
      </div>
      <div class="content flex-1">
        <el-form
          ref="formRef"
          class="form-content flex flex-wrap baseForm"
          :model="valObj"
          label-position="left"
        >
          <div
            v-for="item in contents"
            :key="item.id"
            class="item"
            :style="`width: ${item.width || 'calc(50% - 5px)'}`"
          >
            <el-form-item
              :prop="item.name"
              :label="item.label"
              :label-width="160"
            >
              <BaseFormItem
                :tag="item.tag"
                :bind="item.attrs"
                :model="valObj[item.name]"
                @valChange="(val) => valChange(val, item.name)"
              ></BaseFormItem>
            </el-form-item>
            <div class="remove-box">
              <el-icon class="icon_remove" @click="() => remove(item)">
                <CloseBold />
              </el-icon>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CloseBold } from '@element-plus/icons-vue';
import Sortable from 'sortablejs';
import BaseFormItem from '@/baseComponents/BaseFormItem.vue';

/** 表单每项的属性类型 */
interface ItemObj {
  id: string;
  type: string;
  tag: string;
  name: string;
  label: string;
  width?: string;
  attrs?: any;
}

/** 表单每项的基础属性 */
const ItemAttrObj: {
  [key: string]: Partial<Omit<ItemObj, 'tag'>> & { tag: string };
} = {
  input: {
    tag: 'ElInput',
  },
  select: {
    tag: 'ElSelect',
    attrs: {
      clearable: true,
      options: [],
    },
  },
  textarea: {
    tag: 'ElInput',
    width: '100%',
    attrs: {
      type: 'textarea',
      autosize: {
        minRows: 4,
        maxRows: 6,
      },
    },
  },
};

const options = ref(<string[]>['input', 'select', 'textarea']);
const contents = ref(<ItemObj[]>[]);
const checkItem = ref(<string>'');

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
    handle: '.item', //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    sort: false, // 设为false，禁止sort
    onChoose: (evt: any) => {
      // console.log('evt :>> ', evt);
      checkItem.value = evt.item.innerText;
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
    handle: '.item', //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    onAdd: (evt: any) => {
      const id = new Date().getTime().toString();
      contents.value.splice(evt.newIndex, 0, {
        attrs: {},
        ...ItemAttrObj[checkItem.value],
        id: id,
        type: checkItem.value,
        name: `${checkItem.value}${id}`,
        label: `${checkItem.value}${id}`,
      });

      valObj.value[`${checkItem.value}${id}`] = '';
    },
  });
};

const remove = (item: ItemObj) => {
  contents.value = contents.value.filter((ci) => ci.id !== item.id);
};

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
  .item {
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

    .item {
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
</style>
