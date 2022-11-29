<template>
  <IxTooltip :title="tooltip">
    <div :class="`${prefixCls}-demo__tool`" :onClick="onClick">
      <slot></slot>
    </div>
  </IxTooltip>
</template>
<script setup lang="ts">
defineProps<{
  prefixCls: string
  tooltip?: string
  onClick: () => void
}>()
</script>