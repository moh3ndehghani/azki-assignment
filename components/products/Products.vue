<template>
  <section
    class="grid grid-cols-12 border border-gray-300 bg-white rounded-2xl"
  >
    <SharedProductItem
      v-for="(item, index) in 12"
      :key="index"
      class="col-span-12 md:col-span-6 lg:col-span-3"
      :class="getBorderClasses(index, 12, 4)"
    />
  </section>
</template>

<script setup>
function getBorderClasses(index, totalItems, columnsPerRow) {
  const isFirstInRow = index % columnsPerRow === 0;
  const isLastInRow = (index + 1) % columnsPerRow === 0;
  const isLastRow = index >= totalItems - columnsPerRow;

  let classes = "";

  // Default: border-left + border-bottom
  if (isFirstInRow) {
    classes += " border-l border-b border-gray-300";
  }
  // Last in row: only border-bottom
  else if (isLastInRow) {
    classes += " border-b border-gray-300";
  }
  // Middle items: left + bottom
  else {
    classes += " border-l border-b border-gray-300";
  }

  // Last row overrides
  if (isLastRow) {
    if (isFirstInRow) {
      classes = " border-l border-gray-300";
    } else if (isLastInRow) {
      classes = "";
    } else {
      classes = " border-l border-gray-300";
    }
  }

  return classes.trim();
}
</script>
