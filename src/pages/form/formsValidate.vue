<template>
  <div class="form-1 flex-all column">
    <div class="forms">
      <div class="formValidate" v-for="(form, index) in forms">
        <div class="title">表单{{ index + 1 }}</div>
        <el-form
          ref="eForm"
          label-width="100px"
          :rules="rules[index]"
          :model="formsVal[index]"
        >
          <el-form-item
            v-for="item in form"
            :label="item.label"
            :prop="item.name"
          >
            <el-input v-model="formsVal[index][item.name]" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="btns">
      <el-button type="primary" @click="validate1">验证1</el-button>
      <el-button type="primary" @click="validate2">验证2</el-button>
      <el-button @click="restForms">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DefineComponent, ref } from 'vue';
import { FormRules } from 'element-plus';

const forms = [
  [
    {
      label: '姓名1',
      name: 'name',
    },
    {
      label: '年龄1',
      name: 'age',
    },
  ],
  [
    {
      label: '姓名2',
      name: 'name',
    },
    {
      label: '年龄2',
      name: 'age',
    },
  ],
];

const formsVal = ref(<any>[
  {
    name: '',
    age: '',
  },
  {
    name: '',
    age: '',
  },
]);

const rules: FormRules[] = [
  {
    name: [{ required: true, message: '请填写姓名1' }],
    age: [{ required: true, message: '请填写年龄1' }],
  },
  {
    name: [{ required: true, message: '请填写姓名2' }],
    age: [{ required: true, message: '请填写年龄2' }],
  },
];

const eForm = ref<DefineComponent[] | []>([]);

const validate1 = async () => {
  try {
    await new Promise((resolve, reject) => {
      eForm.value.forEach((item) => {
        item
          .validate()
          .then((res: any) => resolve(res))
          .catch((err: any) => {
            console.log('err :>> ', err);
            reject(err);
          });
      });
    });

    console.log('验证1成功');
  } catch (error) {
    console.log('验证1失败 :>> ', error);
  } finally {
    console.log('验证1结束');
  }
};

const validate2 = async () => {
  try {
    const validates = eForm.value.map((item) => {
      return new Promise((resolve, reject) =>
        item
          .validate()
          .then((res: any) => resolve(res))
          .catch((err: any) => {
            console.log('err :>> ', err);
            reject(err);
          })
      );
    });

    await Promise.all(validates);
    console.log('验证2成功');
  } catch (error) {
    console.log('验证2失败 :>> ', error);
  } finally {
    console.log('验证2结束');
  }
};

const restForms = () => {
  eForm.value.forEach(item => {
    item.resetFields();
  })
}
</script>

<style lang="less" scoped>
.forms {
  flex: 1;
  overflow: auto;
  .formValidate {
    margin-bottom: 16px;
    border: 1px solid #eee;
    padding: 8px;
    .title {
      margin: 8px 0;
    }
  }
}
.btns {
  flex: 0;
  margin: 8px 0;
  border-top: 1px solid #eee;
  padding-top: 8px;
}
</style>
