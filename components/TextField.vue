<template lang="pug">
  v-text-field(
    :value="search"
    :label="label"
    color="rs__primary"
    @input="$emit('input', $event)"
  )
</template>

<script>
export default {
  name: "TextField",
  props: ["search", "label"]
};
</script>
