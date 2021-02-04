<template lang="pug">
  v-container
    v-row
      v-col(cols)
        DataTable(
          :headers="headers"
          :items="items"
        )
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
      items: [],
      headers: [
        { text: 'Name', value: 'first_name', align: 'start' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Year', value: 'car_model_year' },
        { text: 'Sales', value: 'sales' },
        { text: 'Country', value: 'country' },
      ],
    }
  },
  created() {
    this.fetchData(0, 50).then((data) => {
      console.log(data)
      this.items = data
    })
  },
  methods: {
    async fetchData(page, size) {
      setTimeout(await function () {
        const start = page * size
        const data = this.sales.results.slice(start, start + size)
        return data
      }.bind(this), 1000)
    }
  }
}
</script>
