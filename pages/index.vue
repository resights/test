<template lang="pug">
  v-container
    HomepageWrapper(
      v-show="loaded"
      @loaded="updateLoaded"
    )

    v-progress-circular(
      v-if="!loaded"
      width="2"
      color="rs__primary"
      indeterminate
    ).mx-auto
</template>

<script>
import HomepageWrapper from "~/components/HomepageWrapper.vue";

export default {
  components: {
    HomepageWrapper
  },
  data() {
    return {
      loaded: false
    };
  },
  methods: {
    updateLoaded(loaded) {
      this.loaded = loaded;
    }
  }
};
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 50%
  left: 50%
</style>
