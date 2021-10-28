<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="total"
        :loading="loading"
        dense class="elevation-1"
      >
        <template #item.user="{ item }">
          {{ item.user.title }} {{ item.user.first_name }} {{ item.user.last_name }}
        </template>
        <template #item.sales="{ item }">
          {{ Math.round(item.sales) }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: ['headers', 'items', 'loading', 'total'],
    data() {
      return {
        options: {}
      }
    },
    watch: {
      options: {
        handler () {
          this.$emit('fetch')
        },
        deep: true,
      },
    },
  }
</script>

<style lang="sass" scoped>

</style>
