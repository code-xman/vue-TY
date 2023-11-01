<script lang="tsx">
import { h, defineComponent, provide, ref, toRefs, PropType } from 'vue';
import { ElInput, ElSelect, ElDatePicker, ElInputNumber } from 'element-plus';
import VInput from '@/baseComponents/VInput.vue';
import VSelect from '@/baseComponents/VSelect.vue';

interface EleType {
  [key: string]: any;
}

const ele: EleType = {
  ElInput,
  ElSelect,
  ElDatePicker,
  ElInputNumber,
  VInput,
  VSelect,
};

const getItemTag = (tag = 'input') => {
  return `${tag}`;
};

// 获取slots
const getSlots = (tag: any, props: any, children: any, h: any) => {
  let slots = children;
  return slots;
};

export default defineComponent({
  name: 'base-form-item',
  props: {
    tag: [Object, String] as PropType<any>,
    bind: Object,
    on: Object,
    model: [String, Number, Array, Object, null, undefined] as PropType<any>,
    children: {
      type: Object,
      default: () => {},
    },
  },
  setup(props: any, context: any) {
    const tagName = ele[props.tag as keyof EleType] || props.tag;
    const eventsObj: any = {};
    Object.keys(props.on).forEach((event) => {
      eventsObj[`on${event}`] = props.on[event];
    });
    // const slots = getSlots(tagName, props, context.children, h);
    const slots: any = {};
    Object.keys(props.children || {})?.forEach((name) => {
      slots[name] = props.children[name];
    });

    return () =>
      h(
        tagName,
        {
          ...props.bind,
          ...eventsObj,
          modelValue: props.model,
          'onUpdate:modelValue': (val: any) => {
            context.emit('valChange', val);
          },
        },
        slots
      );
  },
});
</script>

<style lang="less" scoped></style>
