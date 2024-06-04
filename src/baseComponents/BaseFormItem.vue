<script lang="tsx">
import { Attrs } from '@/components/form/type';
import { h, defineComponent, provide, ref, toRefs, PropType, watch } from 'vue';
import {
  ElInput,
  ElSelect,
  ElDatePicker,
  ElInputNumber,
  ElSwitch,
} from 'element-plus';
import VInput from '@/baseComponents/VInput.vue';
import VSelect from '@/baseComponents/VSelect.vue';
import VRadio from '@/baseComponents/VRadio.vue';
import VCheckbox from '@/baseComponents/VCheckbox.vue';
import EditOptions from '@/components/EditOptions/index.vue';

interface EleType {
  [key: string]: any;
}

const ele: EleType = {
  ElInput,
  ElSelect,
  ElDatePicker,
  ElInputNumber,
  ElSwitch,

  VInput,
  VSelect,
  VRadio,
  VCheckbox,
  EditOptions,
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
    bind: {
      type: Object as PropType<Attrs>,
      default: () => ({}),
    },
    on: Object,
    model: [
      String,
      Number,
      Array,
      Object,
      Boolean,
      null,
      undefined,
    ] as PropType<any>,
    children: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: any, context: any) {
    const tagName = ele[props.tag as keyof EleType] || props.tag;
    const eventsObj: any = {};
    if (props.on) {
      Object.keys(props.on).forEach((event) => {
        eventsObj[`on${event}`] = props.on[event];
      });
    }
    // const slots = getSlots(tagName, props, context.children, h);
    const slots: any = {};
    if (props.children) {
      Object.keys(props.children || {})?.forEach((name) => {
        slots[name] = props.children[name];
      });
    }

    // modelValue 与 'onUpdate:modelValue' 是一对属性，处理双向绑定数据，等同于 v-model
    return () =>
      h(
        tagName,
        {
          ...props.bind,
          ...eventsObj,
          modelValue: props.model,
          'onUpdate:modelValue': (val: any) => {
            if (props.bind.changeValueType) return;
            context.emit('valChange', val);
          },
          onBlur: (e: any) => {
            if (props.bind.changeValueType === 'blur') {
              switch (props.tag) {
                case 'ElInputNumber':
                  context.emit('valChange', e.target.valueAsNumber);
                  break;

                default:
                  context.emit('valChange', e.target.value);
                  break;
              }
            }
          },
        },
        slots
      );
  },
});
</script>

<style lang="less" scoped></style>
