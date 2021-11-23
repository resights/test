<template lang="pug">
v-container
  v-toolbar.mb-1(dark="", color="blue darken-3")
    v-text-field(
      v-model="search",
      clearable="",
      flat="",
      solo-inverted="",
      hide-details="",
      prepend-inner-icon="mdi-magnify",
      label="Search",
      @input="onSearch"
    )
  v-data-table.elevation-1(
    :headers="headers",
    :items="items",
    :server-items-length="length",
    @update:options="updateOptions"
  )
    template(v-slot:body.prepend="{ headers }")
      tr
        td
        td
        td
          v-select(
            :items="filters.gender",
            :model="gender",
            label="Filter",
            @change="updateGender"
          )
        td
        td
        td

    template(v-slot:item.user="{ item }")
      | {{ item.user.first_name }} {{ item.user.last_name }}
</template>

<script>
export default {
  props: ["headers", "items", "loading", "fetchData", "length"],
  data() {
    return {
      keys: [
        { text: "Name", value: "user", align: "start" },
        { text: "Email", value: "email" },
        { text: "Gender", value: "gender" },
        { text: "Year", value: "year" },
        { text: "Sales", value: "sales" },
        { text: "Country", value: "country" },
      ],
      filters: {
        gender: ["All", "Male", "Female", "Agender", "Genderqueer"],
      },
      search: "",
      gender: "all",
      pagination: {
        sortBy: "name",
      },
      options: {
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        search: "",
        filters: {},
      },
    };
  },
  methods: {
    updateOptions: function (options) {
      this.options = {...this.options, ...options};
      this.fetchData(this.options);
    },
    onSearch: function (val) {
      this.options.search = val;
      this.fetchData(this.options);
    },
    updateGender: function (val) {
      if (val === "All") {
        this.options.filters = {};
      } else {
        this.options.filters = {
          gender: val,
        };
      }
      this.fetchData(this.options);
    },
  },
};
</script>

<style lang="sass" scoped>
.v-data-table
  max-width: 100%
</style>
