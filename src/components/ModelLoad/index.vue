<template>
  <primitive :object="modelGroup" />
</template>
<script lang="ts" setup>
import { ref,watch, onMounted } from 'vue'
import { Group,Mesh } from 'three'
import { useGLTF } from '@tresjs/cientos'
const emit = defineEmits([ 'change', 'update:value'])
const modelGroup = ref(new Group())
const props = defineProps({
  url:String
})
const loadModel = async (url:string) => {
  const gltf = await useGLTF(url)
  console.log(gltf,888)
  if(gltf.scene){
    gltf.scene?.traverse((child:any) => {
      console.log(child,999)
      if (child.isMesh) {
        // 为每个 mesh 添加事件监听器
        // child.on('click', (event) => {
        //   event.stopPropagation()
        //   console.log('Mesh clicked:', child)
        // })
        modelGroup.value.add(child)
      }
    })
  }
  // modelGroup.value.updateMatrixWorld()
  console.log(modelGroup.value,888)
}
watch(()=>props.url,async ()=>{
  if(props.url){
    await loadModel(props.url)
  }
},{deep:true,immediate:true})
defineExpose({
	loadModel,
});
</script>

<style lang="scss" scoped>

</style>
