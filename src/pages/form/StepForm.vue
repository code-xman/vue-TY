<template>
  <div class="flex-all column StepForm">
    <el-steps :active="active" finish-status="success" class="flex-0 steps">
      <el-step v-for="step in steps" :key="step.key" :title="step.title" />
    </el-steps>
    <component
      :is="showStep.tag"
      class="flex-1"
      ref="contentRef"
      v-bind="showStep.attrs"
    ></component>
    <Btns class="flex-0 right" :btnList="btnList"></Btns>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <span>完成填写，成功保存数据，是否重置页面</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="() => dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, markRaw, DefineComponent, onMounted } from 'vue';
import Btns from '@/components/button/boxBottomBtn.vue';
import { btnItem } from '@/components/button/type';
import Content from './components/index';

interface stepsType {
  title: string;
  key: string;
  tag: any;
  attrs: any;
}

const contentRef = ref(<DefineComponent | null>null);
const active = ref(<number>0);
const steps = ref(<stepsType[]>[
  {
    title: 'Step 1',
    key: 'step1',
    // 使用组件时需要markRaw包裹一下
    tag: markRaw(Content.A),
    attrs: {},
  },
  {
    title: 'Step 2',
    key: 'step2',
    tag: markRaw(Content.B),
    attrs: {},
  },
  {
    title: 'Step 3',
    key: 'step3',
    tag: markRaw(Content.C),
    attrs: {},
  },
]);
const stepValue = ref(<any>{});

// 弹框
const dialogVisible = ref(<boolean>false);
// 展示的步骤页面
const showStep = ref(<stepsType>{
  title: 'Step 1',
  key: 'step1',
  // 使用组件时需要markRaw包裹一下
  tag: markRaw(Content.A),
  attrs: {},
});

// 确认
const handleConfirm = () => {
  active.value = 0;
  dialogVisible.value = false;
};

// 按钮
const btnList = ref(<btnItem[]>[
  {
    key: 'prev',
    name: '上一步',
    show: false,
    attr: {
      type: 'primary',
      plain: true,
    },
    click: () => {
      if (active.value <= 0) return;
      active.value--;
    },
  },
  {
    key: 'next',
    name: '下一步',
    attr: {
      type: 'primary',
      plain: true,
    },
    click: async () => {
      const validateRes = await contentRef.value?.validate?.();
      // if (validateRes === false) return;
      if (validateRes) {
        stepValue.value[showStep.value.key] = contentRef.value?.valueObj;
        console.log('stepValue :>> ', stepValue.value);
      }
      if (active.value === steps.value.length - 1) {
        dialogVisible.value = true;
      }
      if (active.value >= steps.value.length - 1) return;
      active.value++;
    },
  },
]);

watch(
  () => active.value,
  (val) => {
    // 监听step的active的变化，更改component的is属性展示不同的组件
    if (val < 0 || val >= steps.value.length) return;

    showStep.value = steps.value[val];

    // 修改next按钮的name
    const next = btnList.value.find((btn) => btn.key === 'next');
    if (next) {
      if (val === steps.value.length - 1) {
        next.name = '完成';
      } else {
        next.name = '下一步';
      }
    }
    const prev = btnList.value.find((btn) => btn.key === 'prev');
    if (prev) {
      if (val <= 0) {
        prev.show = false;
      } else {
        prev.show = true;
      }
    }
  }
);

onMounted(() => {
  steps.value.forEach((item: stepsType) => {
    stepValue.value[item.key] = {};
  });
});
</script>

<style lang="less" scoped>
.steps {
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding: 8px;
}
</style>
