<template lang="pug">
  v-btn(
    color="rs__primary"
    outlined
    large
    @click="$emit('click')"
  ).ml-auto.mt-4 {{ label }}
</template>

<script>
export default {
  name: "Button",
  props: ["label"]
};
</script>
