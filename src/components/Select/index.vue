<template>
    <n-select v-model:value="localValue" :disabled="disabled" :options="list" size="small" :on-update:value="onChange"></n-select>
</template>
<script lang="ts" setup>
import { computed,ref ,watch} from 'vue'
const emit = defineEmits([ 'change', 'update:value'])
const props = defineProps({
  // mini 版本
  value:{
    type:String,
    default:''
  },
  index: {
    request: true,
    type: Number,
    default: 0
  },
  item: {
    type: Object,
    default:()=>{
      return {}
    }
  },
  disabled:{
    type:Boolean,
    default:false
  },
  // 要隐藏的按钮
  list: {
    request: false,
    type: Array,
    default() {
      return []
    }
  },
})
const localValue =  ref(props.value);
watch(()=>props.value,(val)=>{
  localValue.value = val
})
const onChange = (val: any) => {
  emit('update:value', val);
  emit('change', {
    index:props.index,
    value:val
  })
}
</script>

<style lang="scss" scoped>

</style>
