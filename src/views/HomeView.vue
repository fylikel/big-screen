<script setup>
import { useGetParkInfo } from '@/composables/index.js'

const { parkInfo, getParkInfo } = useGetParkInfo()

console.log(getParkInfo);
</script>

<template>
  <main>
    {{parkInfo}}
  </main>
</template>
