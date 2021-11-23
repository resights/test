<template lang="pug">
v-container
  v-row
    v-col(cols)
      DataTable(
        v-if="items.length",
        :headers="headers",
        :items="items",
        :loading="loading",
        :fetch-data="fetchData",
        :length="length"
      )
      v-progress-circular.mx-auto(
        v-else,
        width="2",
        color="rs__primary",
        indeterminate
      )
</template>

<script>
import DataTable from "~/components/DataTable.vue";
import sales from "~/api/sales.json";

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      sales,
      items: [],
      headers: [
        { text: "Name", value: "user", align: "start" },
        { text: "Email", value: "email" },
        { text: "Gender", value: "gender" },
        { text: "Year", value: "year" },
        { text: "Sales", value: "sales" },
        { text: "Country", value: "country" },
      ],
      length: 0,
      loading: false,
    };
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    async fetchData(
      options = {
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        search: "",
      }
    ) {
      const { page, itemsPerPage, sortBy, sortDesc, search, filters } = options;
      console.info("fetchData - ", options);
      // from = 0, limit = 10, sort = 'id', order = 'desc',
      this.loading = true;
      const result = await fetch(`/api/sales`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: search || "",
            from: page - 1,
            limit: itemsPerPage,
            sort: sortBy[0],
            order: sortDesc[0] ? "desc" : "asc",
            filters
          }),
        }
      ).then((res) => res.json());

      const { data, length } = result;
      this.length = length;
      this.items = data;
      this.loading = false;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 50%
  left: 50%
</style>