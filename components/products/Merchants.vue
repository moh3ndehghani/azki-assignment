<template>
  <section>
    <h1 class="font-bold text-gray-600 p-4">فروشگاه‌ها</h1>
    <div class="max-h-[300px] overflow-y-auto">
      <div
        class="flex items-center gap-2 py-2 px-4"
        v-for="(item, index) in data.data"
        :key="index"
      >
        <input
          type="checkbox"
          class="mt-1"
          :checked="
            !!state.selectedMerchants.find(
              (selectedItem:number) => selectedItem === item.id
            )
          "
          @change="merchandClickHandler(item.id)"
        />
        <label for="vehicle1">{{ item.name }}</label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MerchantModel } from "~/models/MerchantModel";

//////// data

const route = useRoute();
const router = useRouter();

interface State {
  selectedMerchants: number[];
}
const state = reactive<State>({
  selectedMerchants: [],
});

state.selectedMerchants = route.query.merchantIds?.split(",")
  ? route.query.merchantIds?.split(",").map((item) => parseInt(item))
  : [];

//////// methods

function merchandClickHandler(id: number) {
  let itemIndex = state.selectedMerchants.findIndex((item) => item === id);
  if (itemIndex !== -1) {
    state.selectedMerchants.splice(itemIndex, 1);
  } else {
    state.selectedMerchants.push(id);
  }

  updateQuery();
}

function updateQuery() {
  const currentQuery = {
    ...route.query,
    merchantIds: state.selectedMerchants.join(","),
  };
  if (!state.selectedMerchants.length) {
    delete currentQuery.merchantIds;
  }
  router.replace({ query: currentQuery });
}
//////// fetching

const { data } = (await await useCustomFetch("/merchants")) as {
  data: { data: MerchantModel[] };
};
</script>
