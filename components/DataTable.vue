<template lang="pug">
.table
  v-data-table.elevation-1(
    :headers="headers",
    :items="items",
    :page="page",
    :items-per-page="perPage",
    hide-default-footer,
    :search="search",
    fixed-header,
    :height="`${height}px`"
  )
  .d-flex.flex-column.mt-5
    v-pagination.d-sm-flex.justify-space-around(
      :value="page",
      @input="changePage",
      :length="pageCount",
      :total-visible="7"
    )
    v-select.d-inline-flex.align-self-center(
      :value="perPage",
      :items="[5, 10, 15, 25]",
      label="Per Page",
      @input="changePerPage"
    )
</template>

<script>
export default {
  props: [
    "headers",
    "items",
    "search",
    "perPage",
    "pageCount",
    "page"
  ],
  data() {
    return {
      height: 0
    }
  },
  created() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    changePerPage(e) {
      this.$emit('change-per-page', parseInt(e, 10))
    },
    changePage(e) {
      this.$emit('change-page', parseInt(e, 10))
    },
    handleResize() {
      this.height = window.innerHeight - 370
    }
  }
};
</script>

<style lang="sass" scoped>
.v-data-table
  max-width: 100%
  // >>> table > tbody
  //   display: block
  //   height: 100%
  //   max-height: calc(100vh - 360px)
  //   overflow-x: hidden
  //   overflow-y: auto
  //   >>> tr
  //     display: table
</style>
