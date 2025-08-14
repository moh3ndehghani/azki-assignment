<template>
  <aside class="p-10 bg-white border border-gray-300 rounded-xl">
    
  </aside>
</template>

<script setup lang="ts">
import type { CategoryModel } from "~/models/CategoryModel";
import type { MerchantModel } from "~/models/MerchantModel";

const { data: categories } = (await useCustomFetch("/categories")) as {
  data: CategoryModel[];
};

const { data: merchants } = (await await useCustomFetch("/merchants")) as {
  data: MerchantModel[];
};
</script>
