<template lang="pug">
  v-container
    v-row
      .d-flex.mt-7(cols="12" sm="6")
        v-text-field(
          v-model="search"
          label="Search"
          class="mx-4"
        )
        v-select(
          :value="columnsValue"
          :items="headers"
          @input="handleColumnInput"
          label="Select columns"
          class="mx-4"
          multiple
        )
    v-row
      v-col(cols).mt-5
        DataTable(
          v-if="items.length"
          :headers="columns"
          :items="items"
          :search="search"
          :page="page"
          :perPage="perPage"
          :pageCount="pageCount"
          @change-per-page="setPerPage"
          @change-page="changePage"
        )
        v-progress-circular(
          v-else
          width="2"
          color="rs__primary"
          indeterminate
        ).mx-auto
</template>

<script>
import DataTable from '~/components/DataTable.vue'
import sales from '~/api/sales.js'

export default {
  components: {
    DataTable
  },
  data() {
    return {
      sales,
      headers: [
        { text: 'Name', value: 'userName', align: 'start' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Year', value: 'year' },
        { text: 'Sales', value: 'sales' },
        { text: 'Country', value: 'country' },
      ],
      items: [],
      search: '',
      columns: [],
      page: 1,
      perPage: 10,
    }
  },
  computed: {
    columnsValue: {
      get: function () {
        return this.columns
      },
      set: function (val) {
        this.columns = this.headers.filter(item => val.includes(item.value))
      }
    },
    pageCount: function () {
      return Math.ceil(this.items.length / this.perPage) || 0
    }
  },
  async mounted() {
    this.items = await this.fetchData()
  },
  methods: {
    async fetchData() {
      await this.delay(3000)
      const results = await sales.results
      this.columns = this.headers
      results.map(result => result.userName = `${result.user.title} ${result.user.first_name} ${result.user.last_name}`)
      return results
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    handleColumnInput(arr) {
      this.columnsValue = arr
    },
    setPerPage(count) {
      this.perPage = count
    },
    changePage(count) {
      this.page = count
    }
  }
}
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 50%
  left: 50%
</style>