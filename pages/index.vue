<template lang="pug">
  v-container
    v-row
      v-col(cols)
        DataTable(:headers="headers" :items="users")
</template>

<script>
import DataTable from '~/components/DataTable.vue'
import users from '~/api/users.js'

export default {
  components: {
    DataTable
  },
  data() {
    return {
      users: null,
      headers: [
        { text: 'User', value: 'name', align: 'start' },
        { text: 'Age', value: 'age' },
        { text: 'Location', value: 'location' },
        { text: 'Phone', value: 'phone' },
        { text: 'Username', value: 'login' },
        { text: 'Email', value: 'email' },
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const data = users.results
      this.users = data
    }
  }
}
</script>
