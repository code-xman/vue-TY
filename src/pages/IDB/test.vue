<!--
 * @Description: IDB
 * @Author: xiangjie
 * @Date: 2023-01-08 12:57:13
 * @LastEditors: xiangjie
 * @LastEditTime: 2023-01-15 16:32:54
-->
<template>
  <div class="flex-all column">
    <div class="IDB-test">IDB-test</div>
    <div class="flex-1 table-box">
      <BaseTable
        :tableProps="tableProps"
        :tableData="personData"
        :columns="columns"
        :optionCol="optionCol"
      >
        <template #options="{ row }">
          <el-button link type="primary" @click="() => handleOp('edit', row)">
            编辑
          </el-button>
          <el-button link type="primary" @click="() => handleOp('detail', row)">
            详情
          </el-button>
          <el-popconfirm
            title="是否确认删除?"
            @confirm="() => handleDelete(row)"
          >
            <template #reference>
              <el-button link type="primary"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </BaseTable>
    </div>
    <Btns class="flex-0 right" :btnList="btnList"></Btns>
  </div>

  <PersonModal
    v-model="showModal"
    :idb="IDB"
    :type="opType"
    :row="opRowData"
    @on-close="onClose"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';

import BaseTable from '@/components/table/baseTable.vue';
import Btns from '@/components/button/boxBottomBtn.vue';
import { btnItem } from '@/components/button/type';

import PersonModal from './personModal.vue';
import { personRowData, createStoreParams } from './type';
import { tableProps, columns, optionCol, personParams } from './data';

/** IDB 数据库 */
const IDB = ref(<IDBDatabase | null>null);
/** IDB---objectStore 表 */
const objectStore = ref();

/** person表所有数据 */
const personData = ref(<personRowData[]>[]);

/** 操作类型 */
const opType = ref(<string>'');

/** 操作行的数据 */
const opRowData = ref(<personRowData>{});

/** 弹框是否展示 */
const showModal = ref(<boolean>false);

/** 打开/链接 数据库 */
const openDB = (databaseName: string, version: number, callback?: Function) => {
  // 打开/链接数据库
  const request = window.indexedDB.open(databaseName, version);

  // 失败
  request.onerror = function (event) {
    ElMessage({
      message: '链接数据库失败',
      type: 'error',
      showClose: true,
    });
  };
  // 成功
  request.onsuccess = function (event) {
    // 获取数据
    IDB.value = request.result;
    callback?.();

    ElMessage({
      message: '链接数据库成功',
      type: 'success',
      showClose: true,
    });
  };
  // 升级 指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
  request.onupgradeneeded = function (
    this: IDBOpenDBRequest,
    event: IDBVersionChangeEvent
  ) {
    // 获取数据
    IDB.value = (event.target as any)?.result;
  };
};
/** 关闭数据库 */
const closeDB = () => {
  try {
    // IDB数据库未链接/打开，直接抛错
    if (!IDB.value) throw `关闭数据库失败`;
    // 断开/关闭 IDB; 关闭数据库后，无法操作数据，但是可以建表;
    IDB.value.close();
    ElMessage({
      message: `已断开数据库链接`,
      type: 'success',
      showClose: true,
    });
  } catch (error) {
    ElMessage({
      message: `${error}`,
      type: 'error',
      showClose: true,
    });
  }
};
/** 创建表 */
const createObjectStore = (params: createStoreParams) => {
  try {
    // IDB数据库未链接/打开，直接抛错
    if (!IDB.value) throw `创建${params.name}表失败`;
    // 判断是否有 表名为 params.name的表；没有就新增一张
    if (!IDB.value?.objectStoreNames.contains(params.name)) {
      // 创建表，并设置 主键 keyPath
      objectStore.value = IDB.value?.createObjectStore(params.name, {
        keyPath: params.keyPath,
      });
      // createIndex 为新建索引，后续就可以通过索引查询数据；
      // 索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。
      params.createIndexs.forEach((item) => {
        objectStore.value.createIndex(item.name, item.attrName, {
          ...item.setting,
        });
      });

      ElMessage({
        message: `创建${params.name}表成功`,
        type: 'success',
        showClose: true,
      });
    } else {
      ElMessage({
        message: `已经存在${params.name}表`,
        type: 'warning',
        showClose: true,
      });
    }
  } catch (error) {
    ElMessage({
      message: `${error}`,
      type: 'error',
      showClose: true,
    });
  }
};

/** 获取数据库表所有数据 */
const getAllData = (storeName: string) => {
  try {
    if (!IDB.value) throw `查询数据失败`;
    // 最终结果
    const res: personRowData[] = [];
    // 获取数据库的表对象
    const objectStore = IDB.value
      ?.transaction(storeName)
      .objectStore(storeName);
    // 游标
    objectStore.openCursor().onsuccess = (event: Event) => {
      const cursor = (event.target as any)?.result;

      if (cursor) {
        res.push(cursor.value);
        cursor.continue();
      } else {
        personData.value = res;
        // console.log('获取数据完成 : >>', personData.value);
      }
    };
  } catch (error) {
    ElMessage({
      message: `${error}`,
      type: 'error',
      showClose: true,
    });
  }
};
/** 处理操作列点击事件 */
const handleOp = (type: string, row: personRowData) => {
  opType.value = type;
  opRowData.value = { ...row };
  showModal.value = true;
};

/** 删除表数据 */
const handleDelete = (row: personRowData) => {
  try {
    if (!IDB.value) throw `删除数据失败`;
    var request = IDB.value
      .transaction([personParams.name], 'readwrite')
      .objectStore(personParams.name)
      .delete(row.id);

    request.onsuccess = function (event) {
      ElMessage({
        message: '数据删除成功',
        type: 'success',
        showClose: true,
      });
      getAllData(personParams.name);
    };
  } catch (error) {
    ElMessage({
      message: `${error}`,
      type: 'error',
      showClose: true,
    });
  }
};

/** 关闭弹框回调 */
const onClose = () => {
  getAllData(personParams.name);
};

/** 底部按钮list */
const btnList: btnItem[] = [
  {
    key: 'closeDB',
    name: '断开test数据库链接',
    click: closeDB,
  },
  {
    key: 'openDB',
    name: '链接test数据库',
    attr: {
      type: 'primary',
    },
    click: () => {
      openDB('test', 1);
    },
  },
  {
    key: 'createStore',
    name: '创建person表',
    click: () => {
      createObjectStore(personParams);
    },
  },
  {
    key: 'add',
    name: '新增数据',
    attr: {
      type: 'primary',
    },
    click: () => {
      opType.value = 'add';
      showModal.value = true;
    },
  },
];

onMounted(() => {
  openDB('test', 1, () => getAllData(personParams.name));
});

onUnmounted(() => {
  closeDB()
});

</script>

<style lang="less" scoped>
.IDB-test {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.table-box {
  overflow: auto;
}
</style>
