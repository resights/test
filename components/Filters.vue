<template>
  <v-row class="mt-10">
    <v-col cols="6" sm="3">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search records"
        single-line
        clearable
        hide-details
        dense
        @input="searchRecords"
      ></v-text-field>
    </v-col>
    <v-col cols="6" sm="3">
      <v-select
        v-model="filters.gender"
        :items="filterOptions.gender"
        label="Filter by gender"
        @change="setFilters"
        clearable
        dense
      ></v-select>
    </v-col>
    <v-col cols="6" sm="3">
      <v-autocomplete
        v-model="filters.year"
        :items="filterOptions.year"
        label="Filter by year"
        @change="setFilters"
        auto-select-first
        clearable
        dense
      ></v-autocomplete>
    </v-col>
    <v-col cols="6" sm="3">
      <v-autocomplete
        v-model="filters.country"
        :items="filterOptions.country"
        label="Filter by country"
        @change="setFilters"
        auto-select-first
        clearable
        dense
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" sm="9">
      <v-range-slider
        label="Sales range"
        v-model="salesRange"
        @change="setFilters"
        :min="min"
        :max="max"
        dense
        hide-details
      ></v-range-slider>
    </v-col>
    <v-col cols="12" sm="3">
      <v-row>
        <v-col cols="6" class="d-flex justify-center"><v-chip label color="primary">Min: {{salesRange[0]}}</v-chip></v-col>
        <v-col cols="6" class="d-flex justify-center" ><v-chip label color="primary">Max: {{salesRange[1]}}</v-chip></v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import sales from '~/api/sales.js'
  export default {
    name: "Filters",
    data() {
      return {
        sales,
        search: '',
        min: 0,
        max: 1000000,
        salesRange: [this.min, this.max],
        filterOptions: {
          gender: [],
          year: [],
          country: [],
        },
        filters: {
          gender: null,
          year: null,
          country: null,
        },
        selectedFilters: {},
        debounce: null,
      }
    },
    created() {
      this.getFilterOptions()
      this.setRangeData()
    },
    methods: {
      // Get data to populate filters
      getFilterOptions() {
        sales.results.forEach(sale => {
          if (!this.filterOptions.gender.includes(sale.gender)) {
            this.filterOptions.gender.push(sale.gender)
          }
          if (!this.filterOptions.year.includes(sale.year)) {
            this.filterOptions.year.push(sale.year)
          }
          if (!this.filterOptions.country.includes(sale.country)) {
            this.filterOptions.country.push(sale.country)
          }
        })
        for (const option in this.filterOptions) {
          this.filterOptions[option].sort()
        }
      },

      // Find min and max sales number and set range
      setRangeData() {
        this.min = Math.floor(sales.results.reduce((a,b)=>a.sales<b.sales?a:b).sales)
        this.max = Math.ceil(sales.results.reduce((a,b)=>a.sales>b.sales?a:b).sales)
        this.salesRange = [this.min, this.max]
      },

      // Setting filters and fetching data after
      setFilters() {
        if (this.filters.gender) this.selectedFilters.gender = this.filters.gender
        else delete this.selectedFilters.gender

        if (this.filters.year) this.selectedFilters.year = this.filters.year
        else delete this.selectedFilters.year

        if (this.filters.country) this.selectedFilters.country = this.filters.country
        else delete this.selectedFilters.country

        this.$emit('reset')
        this.$emit('fetch')
      },

      // Adding debounce when user types search text
      searchRecords() {
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
          this.$emit('fetch')
        }, 500)
      },
    }
  }
</script>

<style scoped>

</style>
