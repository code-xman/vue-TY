<template>
  <div class="tree-box">
    <template v-for="(item, index) in treeData" :key="item.id">
      <Leaf
        v-if="item.type === 'leaf'"
        :id="item.id"
        :class="{ lastOne: index === treeData?.length - 1 }"
        :data="item.children?.[0]"
        @on-delete="handleDelete"
        @on-change="handleChange"
      />
      <Branch
        v-else
        :id="item.id"
        :class="{ lastOne: index === treeData?.length - 1 }"
        :data="item"
        @on-delete="handleDelete"
        @on-change="handleChange"
      />
    </template>
    <div>
      <el-button type="primary" plain @click="() => addLeaf('leaf')">
        添加子级
      </el-button>
      <el-button type="primary" plain @click="() => addLeaf('branch')">
        添加分支
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import Leaf from './Leaf.vue';
import Branch from './Branch.vue';
import { TreeDataType, TreeDataChildrenType } from './type';
import { treeBaseData } from './data';

const treeData = ref(<TreeDataType[]>[]);

const addLeaf = (type: 'leaf' | 'branch') => {
  treeData.value.push({
    ...treeBaseData,
    id: `${type}_${new Date().getTime().toString()}`,
    type,
    children: [
      {
        pId: `${type}_${new Date().getTime().toString()}`,
        id: `children_${new Date().getTime().toString()}`,
        type: 'children',
        value: '',
      },
    ],
  });
};

const handleDelete = (id: string) => {
  treeData.value = treeData.value.filter((e) => e.id !== id);
};
const handleChange = (obj: TreeDataType | TreeDataChildrenType) => {
  const objId =
    obj.type === 'children' ? (obj as TreeDataChildrenType).pId : obj.id;
  const leaf = treeData.value.find((r: TreeDataType) => r.id === objId);
  const leafIndex = treeData.value.findIndex(
    (r: TreeDataType) => r.id === objId
  );
  if (!leaf) return;
  if (obj.type === 'branch') {
    treeData.value.splice(leafIndex, 1, { ...leaf, ...(obj as TreeDataType) });
  } else {
    treeData.value.splice(leafIndex, 1, {
      ...leaf,
      children: [obj as TreeDataChildrenType],
    });
  }
};

defineExpose({
  data: treeData.value,
});
</script>

<style lang="less" scoped></style>
