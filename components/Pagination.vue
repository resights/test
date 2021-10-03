<template lang="pug">
  v-pagination(
    v-model="page"
    :length="getPaginationTotal"
    :total-visible="totalVisible"
    color="rs__primary"
    @input="pageChange"
  ).mt-5
</template>

<script>
export default {
  name: "Pagination",
  props: ["label", "perPage", "totalItems", "totalVisible", "changePage"],
  data() {
    return {
      page: 1
    };
  },
  computed: {
    getPaginationTotal() {
      if (this.totalItems % this.perPage == 0)
        return this.totalItems / this.perPage;
      else return Math.ceil(this.totalItems / this.perPage);
    }
  },
  methods: {
    pageChange(event) {
      this.$emit("input", event);
      this.changePage(event);
    }
  }
};
</script>
