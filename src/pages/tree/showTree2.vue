<template>
  <div class="flex-all column">
    <div class="flex-1 scroll_thin showTree2">
      <branch
        v-for="(item, index) in rules"
        :key="item.fid"
        v-bind="item"
        :class="{ lastOne: index === rules?.length - 1 }"
        @on-delete="deleteBranch"
        @on-change="changeBranch"
      />
      <div>
        <el-button type="primary" plain @click="addFn"> 继续添加 </el-button>
      </div>
    </div>
    <Btns class="flex-0 right" :btnList="btnList"></Btns>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import Btns from '@/components/button/boxBottomBtn.vue';
import { btnItem } from '@/components/button/type';
import branch from './branch.vue';
import { BranchType } from './type';

const attrNum = ref(<number>0);

const rules = ref(<BranchType[]>[
  {
    fid: new Date().getTime().toString(),
    field: '',
    fieldType: '',
    includeType: '',
    value: [''],
    valueType: '',
    children: [],
    variables: [],
  },
]);

// 按钮
const btnList = ref(<btnItem[]>[
  {
    key: 'getData',
    name: '获取数据',
    attr: {
      type: 'primary',
      plain: true,
    },
    click: () => {
      console.log('rules :>> ', rules.value);
    },
  },
]);

const addFn = () => {
  rules.value.push({
    fid: new Date().getTime().toString(),
    field: '',
    fieldType: '',
    includeType: '',
    value: [''],
    valueType: '',
    children: [],
    variables: [],
  });
};

const deleteBranch = async (fid: string) => {
  try {
    if (rules.value.length <= 1) {
      ElMessage.warning('至少需要保留一条规则');
      return;
    }

    const message = '删除此项，确认是否继续？';

    await ElMessageBox.confirm(message, {
      title: '操作提示',
      type: 'warning',
      closeOnClickModal: false,
    });
    rules.value = rules.value.filter((item) => item.fid !== fid);

    ElMessage.success('删除成功');
  } catch (error) {
    if (error === 'cancel') return;
    ElMessage.error(`${error}`);
  }
};
// 数据改变
const changeBranch = (data: BranchType) => {
  console.log('data :>> ', data);
  const rule = rules.value.find(r => r.fid === data.fid);
  const rIndex = rules.value.findIndex(r => r.fid === data.fid);
  if (!rule) return;
  rules.value.splice(rIndex, 1, { ...rule, ...data})
  console.log('JSON.stringify(data) :>> ', JSON.stringify(rules.value));
};

// 此处依赖注入provide提供一个function，其内部返回一个响应式数据，此时整条数据的响应式的状态并不会丢失；
// 此组件及其子组件对ruleObj的修改应当谨慎，避免数据混乱；
provide('ruleObj', () => ({ attrNum }))
</script>

<style lang="less" scoped>
.showTree2 {
  overflow-y: auto;
}
</style>
