<script lang="tsx">
import { h, defineComponent, provide, ref, toRefs, PropType } from 'vue';

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
    tag: Object,
    bind: Object,
    on: Object,
    model: [String, Number, Array, Object, null, undefined] as PropType<any>,
    children: {
      type: Object,
      default: () => {},
    },
  },
  setup(props: any, context: any) {
    const tagName = props.tag;
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
