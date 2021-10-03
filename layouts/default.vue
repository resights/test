<template lang="pug">
  v-app(dark)
    v-app-bar(color="rs__primary" fixed app).font-weight-medium.white--text.elevation-4
      v-toolbar-title(v-text="title")
    v-main
      nuxt
    v-footer(app)
      span.mx-auto {{ getCopyright() }}
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      title: "Resights",
      copyright: ""
    };
  },
  methods: {
    getCopyright() {
      return `${this.title} \u00A9 ${new Date().getFullYear()}`;
    }
  }
};
</script>
