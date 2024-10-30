/**
 *  获取二维数组的所有sku，每项取一个，先前面项不动，遍历最后一项数组，依次往前修改；
 * @param arr 需要去获取sku的二维数组 eg. [[1, 2, 3], [a, b, c], [甲, 乙, 丙]]
 */
const generateSKUs = (arr: any[][]) => {
  const res: any[] = [];

  // 组装每一个sku组合
  const getCombination = (combination: any[], startIndex: number) => {
    // 把二维数组的index看为行列，startIndex为行，i为列
    if (startIndex === arr.length) {
      // 每行都取值后，startIndex正好等于length，这时就可以直接将 combination push进结果res里面；注意slice浅拷贝，后续combination会被继续使用；
      res.push(combination.slice());
      return;
    }

    // 将每行的数据进行遍历
    for (let i = 0; i < arr[startIndex].length; i++) {
      // 依次取每行一个数据放入组合里
      combination.push(arr[startIndex][i]);
      // 如何递归getCombination方法，去下一行取数据
      getCombination(combination, startIndex + 1);
      // 下一行数据取完后记得清除最后一个数据，保证前面行数据不变，先遍历完最后一行的数据
      combination.pop();
    }
  };

  // 初始化启动getCombination方法
  getCombination([], 0);

  return res;
};

const arrays = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const skus = generateSKUs(arrays);
console.log(skus);

export default generateSKUs;