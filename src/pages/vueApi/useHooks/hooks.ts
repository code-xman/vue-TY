import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getValidateCode } from '@/api/common';

// useState 类似于react的useState，定义一个变量和修改它的方法
export const useState = (init: any) => {
  const state = ref<any>(init);
  const setState = (value: any) => {
    state.value = value;
  };
  return [state, setState];
};

// useCountDown 处理发送短信验证码的hook
export const useCountDown = (downNum: number = 60) => {
  const sendBtnText = ref<string>('发送验证码');
  const countDownNum = ref<number>(downNum);
  const disabled = ref<boolean>(false);
  const timer = ref<any>(null);

  // 倒计时
  const countdown = () => {
    timer.value = setTimeout(() => {
      countDownNum.value -= 1;
      sendBtnText.value = `${countDownNum.value}s后重新获取`;

      if (countDownNum.value <= 0) {
        timer.value && clearTimeout(timer.value);
        sendBtnText.value = '发送验证码';
        countDownNum.value = downNum;
        disabled.value = false;
      } else {
        countdown();
      }
    }, 1000);
  }

  // 发送方法
  const sendFn = async () => {
    try {
      sendBtnText.value = `${countDownNum.value}s后重新获取`;
      disabled.value = true;
      countdown();
      // 发送验证码接口
      const code = await getValidateCode();
      console.log('验证码 :>> ', code);
      ElMessage.success('已发送验证码')
    } catch (error) {
      ElMessage.error(`${error}`)
      disabled.value = false;
    }
  };

  return {
    sendBtnText,
    disabled,
    timer,
    sendFn,
  };
};
