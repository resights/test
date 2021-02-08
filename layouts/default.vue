<template lang="pug">
  v-app.app(dark)
    v-app-bar(color="rs__primary" fixed app).font-weight-medium.white--text.elevation-4
      v-toolbar-title(v-text="title")
    v-main
      nuxt
    v-footer(app)
      span.mx-auto {{title}} &copy; {{ new Date().getFullYear() }}
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

<style lang="scss" scoped>
  .app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden
  }
</style>
