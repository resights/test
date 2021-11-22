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
      label="Search"
    )
  v-data-table.elevation-1(
    :headers="headers",
    :items="items",
  )

    template(v-slot:body.prepend='{ headers }')
      tr
        td
        td
        td
          v-select(:items='filters.gender' :model='gender' label='Filter')
        td
        td
        td

    template(v-slot:item.user='{ item }')
      | {{ item.user.first_name }} {{ item.user.last_name }}

</template>

<script>
export default {
  props: ["headers", "items"],
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
        gender: ["all", "male", "female"],
      },
      search: "",
      gender: "all",
      pagination: {
        sortBy: "name",
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.v-data-table
  max-width: 100%
</style>
