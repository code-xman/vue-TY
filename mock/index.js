// mock的写法参照 http://mockjs.com
import Mock, { Random } from 'mockjs';

const randomDate = () =>
  Random.natural(new Date('1990-01-01').getTime(), new Date().getTime());

//延时200-600毫秒请求到数据
Mock.setup({
  timeout: '200-600',
});

Mock.mock(new RegExp('getOptions'), {
  'data|2-4': [
    {
      'label|+1': ['星迪', '之美', '蒂亚', '大风'],
      'value|+1': ['01', '02', '03', '04'],
    },
  ],
});
