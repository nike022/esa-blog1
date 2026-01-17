<template>
  <div ref="walineContainer" class="waline-wrapper"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { init } from '@waline/client'
import '@waline/client/style'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const walineContainer = ref(null)
let walineInstance = null

onMounted(() => {
  walineInstance = init({
    el: walineContainer.value,
    serverURL: 'https://pinglun.900030.xyz',
    path: props.path,
    lang: 'zh-CN',
    dark: 'auto',
    meta: ['nick', 'mail'],
    requiredMeta: ['nick'],
    pageSize: 10,
    emoji: [
      '//unpkg.com/@waline/emojis@1.2.0/weibo',
      '//unpkg.com/@waline/emojis@1.2.0/bilibili'
    ]
  })
})

watch(() => props.path, (newPath) => {
  if (walineInstance) {
    walineInstance.update({ path: newPath })
  }
})
</script>

<style scoped>
.waline-wrapper {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid var(--border);
}
</style>
