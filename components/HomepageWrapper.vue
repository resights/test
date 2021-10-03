<template lang="pug">
  div
    div.d-flex.align-stretch
      v-form(ref="form").d-flex.flex-grow-1.align-stretch.mt-5.mr-15
        TextField(
          v-model="search"
          label="Search all items in table"
          @input="getDataFromApi()"
        ).pa-0

        Autocomplete(
          v-model="selectedOptions.gender"
          :items="itemsFiltered"
          :filter-table="filterTableBySelectedFilters"
          :item-text="gender"
        ).ml-5

        Autocomplete(
          v-model="selectedOptions.country"
          :items="itemsFiltered"
          :filter-table="filterTableBySelectedFilters"
          :item-text="country"
        ).ml-5

      div.d-flex
        Button(
          :label="resetAllLabel"
          @click="resetAll()"
        )

    v-data-table(
      :headers="headers"
      :items="items"
      :items-per-page="perPage"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      dark
      background="rs_primary"
    ).elevation-1.mt-5.xs12
      template(
        #item.user="{item}"
      ) {{ item.user.title }} {{ item.user.first_name }} {{ item.user.last_name }}

    Pagination(
      v-model="page"
      ref="pagination"
      :per-page="perPage"
      :total-items="totalItems"
      :totalVisible="totalVisible"
      :changePage="changePage"
    ).mt-5
</template>

<script>
// Created new json file from sales.js
// It's more likely we'll get json as API response
import sales from "~/api/sales.json";

import Autocomplete from "~/components/Autocomplete";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import Pagination from "~/components/Pagination";

import {
  TABLE_USER,
  TABLE_EMAIL,
  TABLE_GENDER,
  TABLE_YEAR,
  TABLE_SALES,
  TABLE_COUNTRY,
  TABLE_COLOR,
  TABLE_CURRENCY,
  RESET_ALL
} from "~/consts/Consts";

import { filterData } from "~/utils/CommonUtil.js";

export default {
  components: {
    Autocomplete,
    TextField,
    Button,
    Pagination
  },
  name: "HomepageWrapper",
  emits: ["loaded"],
  data() {
    return {
      sales,
      headers: [
        { text: TABLE_USER, value: TABLE_USER.toLowerCase() },
        { text: TABLE_EMAIL, value: TABLE_EMAIL.toLowerCase() },
        { text: TABLE_GENDER, value: TABLE_GENDER.toLowerCase() },
        { text: TABLE_YEAR, value: TABLE_YEAR.toLowerCase() },
        { text: TABLE_SALES, value: TABLE_SALES.toLowerCase() },
        { text: TABLE_COUNTRY, value: TABLE_COUNTRY.toLowerCase() },
        { text: TABLE_COLOR, value: TABLE_COLOR.toLowerCase() },
        { text: TABLE_CURRENCY, value: TABLE_CURRENCY.toLowerCase() }
      ],
      search: "",
      totalItems: 0,
      items: [],
      itemsFiltered: [],
      loading: true,
      options: {},
      counter: 0,
      page: 1,
      perPage: 10,
      totalVisible: 9,
      firstLoad: true,
      genders: [],
      countries: [],
      filters: {},
      selectedOptions: {
        gender: null,
        country: null
      },
      gender: TABLE_GENDER.toLowerCase(),
      country: TABLE_COUNTRY.toLowerCase(),
      resetAllLabel: RESET_ALL
    };
  },
  created() {
    this.populateGenderAndCountryOptions(sales.results);
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      this.fakeApiCall()
        .then(data => {
          this.items = data.items;
          this.totalItems = data.total;
          this.loading = false;
          this.perPage = this.options.itemsPerPage;

          if (this.firstLoad) {
            this.$emit("loaded", true);
            this.firstLoad = false;
          }
        })
        .catch(err => console.error(err));
    },

    // This is mock function that should be API call e.x. fetch() or axios.get()
    fakeApiCall() {
      return new Promise((resolve, reject) => {
        let items = sales.results;
        let total = 0;
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;

        // Filter items if any filter is applied
        if (!!Object.keys(this.filters).length) {
          items = this.filterData(items, this.filters);
        }

        // Filter items by search keyword
        if (this.search) {
          items = items.filter(result => {
            return (
              Object.entries(result).filter(([key, value]) => {
                if (typeof value !== "object")
                  return value
                    .toString()
                    .toLowerCase()
                    .includes(this.search.toLowerCase());

                return `${value.title} ${value.first_name} ${value.last_name}`
                  .toLowerCase()
                  .includes(this.search.toLowerCase());
              }).length > 0
            );
          });
        }

        // Sort items
        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]];
            const sortB = b[sortBy[0]];

            if (sortDesc[0]) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        // Show only filtered options in filters to avoid 'no data' message and better UX
        this.itemsFiltered = [...items];

        // Show total items before slicing
        total = items.length;

        // Slice items to show only data we need (per page)
        if (itemsPerPage > 0 && items.length > itemsPerPage) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }

        // Simulate waiting for data
        setTimeout(() => {
          resolve({
            items,
            total
          });
        }, 300);
      });
    },

    // This would be api call with page argument that returns same structure as fakeApiCall()
    changePage(page) {
      this.options.page = page;
    },

    filterTableBySelectedFilters() {
      if (this.selectedOptions.gender && !!this.selectedOptions.gender.length)
        this.filters.gender = this.selectedOptions.gender;
      else delete this.filters.gender;

      if (this.selectedOptions.country && !!this.selectedOptions.country.length)
        this.filters.country = this.selectedOptions.country;
      else delete this.filters.country;

      this.getDataFromApi();
    },

    // Imported util
    filterData,

    populateGenderAndCountryOptions(items) {
      items.forEach(item => {
        if (!this.genders.includes(item.gender)) this.genders.push(item.gender);
        if (!this.countries.includes(item.country))
          this.countries.push(item.country);
      });
    },

    resetAll() {
      this.search = "";
      this.selectedOptions = {
        gender: null,
        country: null
      };
      this.filters = {};
      this.genders = [];
      this.countries = [];
      this.page = 1;
      this.perPage = 10;
      this.options.page = this.page;
      this.options.perPage = this.perPage;
      this.$refs.form.reset();
      this.$refs.pagination.page = this.page;
      this.$refs.pagination.perPage = this.perPage;

      // this.populateGenderAndCountryOptions(sales.results);
      this.getDataFromApi();
    }
  }
};
</script>

<style lang="sass" scoped>
.v-data-table
  max-width: 100%
  ::v-deep .v-data-footer__icons-before,
  ::v-deep .v-data-footer__icons-after
    display: none
</style>
