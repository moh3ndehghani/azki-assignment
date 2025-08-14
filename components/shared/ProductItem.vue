<template>
  <div class="p-2">
    <img :src="props.item.imageUrl" class="w-full aspect-square object-cover" />
    <NuxtLink to="/" class="line-clamp-2 hover:text-blue-500">
      {{ props.item.name }}
    </NuxtLink>

    <span class="text-sm text-gray-500">شروع قیمت از </span>
    <div class="flex items-start gap-1">
      <span class="font-bold">{{ formatNumber(props.item.minPrice, 0) }}</span>
      <span class="text-xs">تومان</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductModel } from "~/models/ProductModel";

const { formatNumber } = useThousandMask();

const props = defineProps<{
  item: ProductModel;
}>();
</script>
