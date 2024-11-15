<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-10-12 14:14:10
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-10-28 14:23:21
 * @FilePath: \3DThreeEdit\src\layout\components\LayoutHeaderPro\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <layout-header>
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #center>
      <slot name="center"></slot>
    </template>
    <template #ri-left>
      <slot name="ri-left"></slot>
    </template>
    <template #ri-right>
      <!-- <go-user-info></go-user-info> -->
      <slot name="ri-right"></slot>
    </template>
  </layout-header>
</template>
<script setup lang="ts">
import { LayoutHeader } from '@/layout/components/LayoutHeader'
import { GoUserInfo } from '@/components/GoUserInfo'
</script>
