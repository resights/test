<template>
<v-data-table class="elevation-1 mt-10" :headers="headers" :items="items" item-key="email" dense="dense"></v-data-table>
</template>

<script>
export default {
  props: ['headers', 'items'],
}
</script>

<style lang="sass" scoped>
  .v-data-table
    max-width: 100%
</style>
