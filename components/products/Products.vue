<template>
  <section
    class="grid grid-cols-12 border border-gray-300 bg-white rounded-2xl"
    id="productsWrapper"
  >
    <SharedProductItem
      v-for="(item, index) in state.items"
      :key="index"
      :item="item"
      class="col-span-12 md:col-span-6 lg:col-span-3"
    />

    <div
      v-if="state.loading"
      class="col-span-12 flex align-center justify-center h-[100px]"
    >
      ...loading
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductModel } from "~/models/ProductModel";
const route = useRoute();

interface State {
  items: ProductModel[];
  totalItems: number;
  loading: boolean;
  page: number;
}
const state = reactive<State>({
  items: [],
  totalItems: 0,
  loading: false,
  page: 1,
});

//////// functions

async function getProducts(
  isServer: boolean = true,
  clearData: boolean = false
) {
  state.loading = true;
  let endpoint: string = "/products";
  if (route.params.categoryId) {
    endpoint += `/${route.params.categoryId}`;
  }
  const { data } = (await useCustomFetch(endpoint, {
    method: "POST",
    server: isServer,
    query: {
      size: 12,
      page: state.page,
    },
  })) as { data: { data: ProductModel[]; totalItems: number } };

  if (clearData) {
    // اگر نیاز داشتیم دیتاهارو دوباره از اول بخوانیم که زمانی این اتفاق میافتد که فیلتر جدید اضافه کنیم
    state.items = data.data;
  } else {
    state.items.push(...data.data);
  }

  state.totalItems = data.totalItems;
  state.loading = false;
}

async function loadMore() {
  //اگر در حال لود شدن نبود و هنوز به ته محصولات نرسیده بودیم
  if (!state.loading && state.totalItems > state.items.length) {
    const element = document.getElementById("productsWrapper");
    const rect = element.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    if (rect.bottom < viewportHeight) {
      state.page++;
      // await getProducts(false);
    }
  }
}

//////// fetching

// await getProducts();

onMounted(() => {
  window.addEventListener("scroll", loadMore);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", loadMore);
});
</script>
