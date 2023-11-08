// mock的写法参照 http://mockjs.com
import Mock, { Random } from 'mockjs';

const randomDate = () =>
  Random.natural(new Date('1990-01-01').getTime(), new Date().getTime());

//延时200-600毫秒请求到数据
Mock.setup({
  timeout: '200-600',
});

// 选项
Mock.mock(new RegExp('getOptions'), {
  'data|2-4': [
    {
      'label|+1': ['星迪', '之美', '蒂亚', '大风'],
      'value|+1': ['01', '02', '03', '04'],
    },
  ],
});

const varis = () =>
  Random.pick(
    ['抵扣次数', '计费结果', '活动折扣', '活动时间', '活动地区'],
    2,
    4
  );
// 选项
Mock.mock(new RegExp('getVariable'), {
  'data|2-4': [
    {
      'label|+1': ['抵扣次数', '计费结果', '活动折扣', '活动时间', '活动地区'],
      'value|+1': [
        'deductionTimes',
        'chargingRes',
        'eventDiscount',
        'activityTime',
        'activityArea',
      ],
    },
  ],
});

// 验证码
Mock.mock(new RegExp('getValidateCode'), {
  'code': /^[a-zA-Z0-9]{6}$/,
});
