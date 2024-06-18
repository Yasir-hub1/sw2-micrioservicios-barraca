<template>
  <div :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <loading :isLoading="isLoading"></loading>
    <router-view @setLoading="setLoading"></router-view>
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    setLoading(isLoading) {
      console.log("APP>VUE  ", isLoading);
      this.isLoading = isLoading;
    }
  }
}
</script>
