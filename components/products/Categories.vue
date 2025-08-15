<template>
  <section class="pb-4">
    <h1 class="font-bold text-gray-600 p-4">فیلترها</h1>

    <ul class="">
      <li
        v-for="(category, index) in state.categories"
        :key="index"
        class="px-4"
        :class="{ 'bg-gray-50': category.open }"
      >
        <div
          @click="toggleCategory(category)"
          class="py-2 cursor-pointer flex items-center justify-between"
        >
          <span class="text-gray-500">{{ category.name }}</span>
          <span v-if="category.children && category.children.length > 0">
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': category.open }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        <ul v-if="category.open" class="ps-2">
          <li
            v-for="(subcategory, subIndex) in category.children"
            :key="subIndex"
            class="text-sm text-gray-400 py-2 cursor-pointer hover:text-blue-500"
            @click="categoryClickHandler(subcategory)"
          >
            {{ subcategory.name }}
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { CategoryModel } from "~/models/CategoryModel";

//////// data

const route = useRoute();
const router = useRouter();

interface State {
  categories: CategoryModel[];
}
const state = reactive<State>({
  categories: [],
});

//////// functions

const makeTree = (
  data: CategoryModel[],
  parent: number | null = null
): CategoryModel[] => {
  const nodes = data?.filter((item) => item.parent === parent);
  return nodes?.map((node) => ({
    ...node,
    children: makeTree(data, node.id),
  }));
};

const toggleCategory = (category: CategoryModel) => {
  console.log(category);

  category.open = !category.open;
};

function categoryClickHandler(subcategory: CategoryModel) {
  const currentQuery = { ...route.query };
  router.push({
    path: `/products/${subcategory.id}`,
    query: currentQuery,
  });
}

//////// fetching

const { data } = (await useCustomFetch("/categories")) as {
  data: { data: CategoryModel[] };
};

state.categories = makeTree(data.data);
</script>
