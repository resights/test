<template>
<v-app dark>
  <v-app-bar class="font-weight-medium white--text elevation-4" color="rs__primary" fixed="fixed" app="app">
      <v-toolbar-title :v-text="title"></v-toolbar-title>
  </v-app-bar>
  <v-main>
      <nuxt></nuxt>
  </v-main>
  <v-footer app="app"><span class="mx-auto">{{title}} &copy; {{ new Date().getFullYear() }}</span></v-footer>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Resights'
    }
  }
}
</script>
