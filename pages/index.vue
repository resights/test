<template>
  <v-container>
    <filters
      ref="filters"
      @reset="resetPagination"
      @fetch="fetchData">
    </filters>
    <data-table
      ref="table"
      :headers="headers"
      :items="items"
      :total="total"
      :loading="loading"
      @fetch="fetchData">
    </data-table>
  </v-container>
</template>

<script>
  import sales from '~/api/sales.js'
  import Filters from "../components/Filters";
  import DataTable from "../components/DataTable";

  export default {
    name: 'MainPage',
    components: { Filters, DataTable },
    data() {
      return {
        sales,
        headers: [
          { text: 'Name', value: 'user', align: 'start' },
          { text: 'Email', value: 'email' },
          { text: 'Gender', value: 'gender' },
          { text: 'Year', value: 'year' },
          { text: 'Sales', value: 'sales' },
          { text: 'Country', value: 'country' },
        ],
        items: [],
        total: 0,
        loading: false,
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      // Fake data fetching
      async fetchData() {
        this.loading = true
        this.getData()
          .then(res => {
            this.items = res.items
            this.total = res.total
            this.loading = false
          })
          .catch(err => {
            console.log(err)
          })
      },

      // Fake api call
      getData() {
        return new Promise((resolve, reject) => {
          const { sortBy, sortDesc, page, itemsPerPage } = this.$refs.table.options

          let items = sales.results
          let total = 0

          items = this.filterItems(items)
          items = this.searchItems(items)

          total = items.length

          if (!!sortBy && sortBy.length === 1 && sortDesc.length === 1) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]

              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (itemsPerPage > 0) {
            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          }

          setTimeout(() => {
            resolve({
              items,
              total,
            })
          }, 1000)
        })
      },

      // Filtering records with selected filters
      filterItems(items) {
        let selectedFilters = this.$refs.filters.selectedFilters
        let salesRange = this.$refs.filters.salesRange

        let filteredItems = items.filter(item => {
          for (const key of Object.keys(selectedFilters)) {
            if (selectedFilters[key] !== item[key]) return
          }
          return item
        })

        // Check for records in selected range
        return filteredItems.filter(item => {
          return item.sales >= salesRange[0] && item.sales <= salesRange[1] + 1
        })
      },

      // Using search text from input to search records from the table
      searchItems(items) {
        let search = this.$refs.filters.search
        let text = !!search ? search.toLowerCase() : ''
        return items.filter(item => {
          return item.user.title.toLowerCase().includes(text)
            || item.user.first_name.toLowerCase().includes(text)
            || item.user.last_name.toLowerCase().includes(text)
            || item.email.includes(text)
        })
      },

      resetPagination() {
        this.$refs.table.options.page = 1
      }
    },
  }
</script>

<style lang="sass" scoped>

</style>
