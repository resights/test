<template lang="pug">
  v-autocomplete(
    :value="selectedOption"
    :items="items"
    :item-text="itemText"
    color="rs__primary"
    outlined
    dense
    chips
    small-chips
    :label="setLabel()"
    @change="filterTable"
    @input="$emit('input', $event)"
  )
</template>

<script>
export default {
  name: "Autocomplete",
  props: ["selectedOption", "items", "itemText", "filterTable"],
  emits: ["change"],
  methods: {
    setLabel() {
      return `Filter by ${this.itemText}`;
    }
  }
};
</script>
